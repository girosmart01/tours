# -*- coding: utf-8 -*-
"""
Бэкенд Sunny Tours Mini App: приём заявок на бронирование экскурсий
+ трекинг визитов (страна/источник) + отдача статичного фронтенда.

Запуск:
    pip install -r requirements.txt
    cp .env.example .env
    uvicorn main:app --host 0.0.0.0 --port 8000
"""
import json
import logging
from datetime import date

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from config import load_config
from database import (
    Booking, Visit, export_bookings_csv, init_db, log_visit, save_booking, visit_stats,
)
from telegram_auth import validate_init_data

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

cfg = load_config()
init_db(cfg.db_path)

app = FastAPI(title="Sunny Tours Mini App API")


class BookRequest(BaseModel):
    init_data: str
    tour_id: str
    tour_title: str
    tour_date: str  # YYYY-MM-DD
    name: str
    phone: str
    country: str
    hotel: str = ""
    room: str = ""
    source: str = ""


class TrackVisitRequest(BaseModel):
    init_data: str
    source: str = ""


def _extract_tg_user(init_data_raw: str) -> dict:
    user_data = validate_init_data(init_data_raw, cfg.bot_token)
    if user_data is None:
        raise HTTPException(status_code=401, detail="Не удалось подтвердить пользователя Telegram")
    try:
        return json.loads(user_data.get("user", "{}"))
    except json.JSONDecodeError:
        return {}


def _get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else ""


async def _lookup_country(ip: str) -> str:
    if not ip or ip.startswith("127.") or ip.startswith("10.") or ip == "::1":
        return "unknown"
    try:
        async with httpx.AsyncClient(timeout=4) as client:
            resp = await client.get(f"https://ipapi.co/{ip}/country_name/")
            if resp.status_code == 200 and resp.text and "error" not in resp.text.lower():
                return resp.text.strip()
    except Exception as e:
        logger.warning("Geo lookup failed for %s: %s", ip, e)
    return "unknown"


@app.post("/api/track-visit")
async def track_visit(payload: TrackVisitRequest, request: Request):
    tg_user = _extract_tg_user(payload.init_data)
    ip = _get_client_ip(request)
    country = await _lookup_country(ip)
    log_visit(cfg.db_path, Visit(
        tg_id=tg_user.get("id") or 0,
        username=tg_user.get("username", ""),
        country=country,
        source=payload.source or "direct",
    ))
    return {"ok": True}


@app.get("/api/stats")
async def get_stats(key: str = ""):
    if not cfg.stats_key or key != cfg.stats_key:
        raise HTTPException(status_code=403, detail="Неверный ключ доступа")
    return visit_stats(cfg.db_path)


@app.get("/api/bookings.csv")
async def bookings_csv(key: str = ""):
    if not cfg.stats_key or key != cfg.stats_key:
        raise HTTPException(status_code=403, detail="Неверный ключ доступа")
    out_path = "bookings_export.csv"
    export_bookings_csv(cfg.db_path, out_path)
    return StreamingResponse(
        open(out_path, "rb"),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=bookings.csv"},
    )


@app.post("/api/book")
async def book_tour(payload: BookRequest):
    tg_user = _extract_tg_user(payload.init_data)
    tg_id = tg_user.get("id")
    username = tg_user.get("username", "")
    if not tg_id:
        raise HTTPException(status_code=400, detail="Не удалось определить пользователя")

    try:
        tour_date = date.fromisoformat(payload.tour_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Неверный формат даты")

    if tour_date < date.today():
        raise HTTPException(status_code=400, detail="Дата уже прошла, выберите другую")

    for field_name, value in [("Имя", payload.name), ("Телефон", payload.phone), ("Страна", payload.country)]:
        if not value.strip():
            raise HTTPException(status_code=400, detail=f"Заполните поле: {field_name}")

    booking = Booking(
        tour_id=payload.tour_id,
        tour_title=payload.tour_title,
        tour_date=payload.tour_date,
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        country=payload.country.strip(),
        hotel=payload.hotel.strip(),
        room=payload.room.strip(),
        tg_id=tg_id,
        username=username,
        source=payload.source or "direct",
    )
    save_booking(cfg.db_path, booking)

    text = (
        f"🌴 <b>Новая заявка на тур</b>\n\n"
        f"🗺 Тур: {booking.tour_title}\n"
        f"🗓 Дата: {booking.tour_date}\n"
        f"👤 {booking.name}\n"
        f"📞 {booking.phone}\n"
        f"🌍 Страна: {booking.country}\n"
        f"🏨 Отель: {booking.hotel or '—'}\n"
        f"🚪 Номер комнаты: {booking.room or '—'}\n"
        f"🔗 Источник: {booking.source}\n"
        f"🆔 tg: {booking.tg_id} (@{booking.username or '—'})"
    )
    url = f"https://api.telegram.org/bot{cfg.bot_token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(url, json={
                "chat_id": cfg.admin_chat_id, "text": text, "parse_mode": "HTML",
            })
    except Exception as e:
        logger.error("Не удалось отправить уведомление админу: %s", e)

    return {"ok": True}


# Статичный фронтенд отдаём последним, чтобы не перекрывать /api/*
app.mount("/", StaticFiles(directory=".", html=True), name="frontend")
