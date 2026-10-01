"""Short tour inquiries. Separate table preserves existing bookings and exports."""
import json
import logging
import sqlite3
from datetime import datetime, date
from zoneinfo import ZoneInfo
from pathlib import Path

SCHEDULE = json.loads(Path(__file__).with_name("schedule.json").read_text())

def scheduled_date_allowed(tour_id, day):
    if tour_id in SCHEDULE["weekly"]:
        return (day.weekday() + 1) % 7 == SCHEDULE["weekly"][tour_id]
    if tour_id in SCHEDULE["dates"]:
        return day.isoformat() in SCHEDULE["dates"][tour_id]
    return True


import httpx
from fastapi import HTTPException
from pydantic import BaseModel, Field

TOURS = {'golden_ring': 'Золотое кольцо Шри-Ланки', 'treasure': 'Сокровище Цейлона', 'rafting': 'Рафтинг по горной реке', 'safari': 'Сафари', 'ella': 'Элла', 'ella_safari': 'Элла + Сафари', 'whales': 'Морская экскурсия к китам', 'kandy': 'Канди + Питомник слонов'}

class InquiryRequest(BaseModel):
    init_data: str
    tour_id: str
    tour_date: str = ''
    adults: int = Field(ge=1, le=50)
    children: int = Field(default=0, ge=0, le=50)
    resort: str = Field(max_length=200)
    contact: str = Field(default='', max_length=100)
    source: str = Field(default='direct', max_length=200)


def register_inquiries(app, cfg, authenticate):
    with sqlite3.connect(cfg.db_path) as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT, tour_id TEXT, tour_date TEXT,
            adults INTEGER, children INTEGER, resort TEXT, contact TEXT,
            tg_id INTEGER, username TEXT, source TEXT, created_at TEXT,
            notification_sent INTEGER DEFAULT 0)''')

    @app.post('/api/inquiry')
    async def inquiry(payload: InquiryRequest):
        user = authenticate(payload.init_data)
        if not user.get('id'):
            raise HTTPException(400, 'Не удалось определить пользователя Telegram')
        if payload.tour_id not in TOURS:
            raise HTTPException(400, 'Выберите экскурсию из каталога')
        if payload.tour_date:
            try:
                day = date.fromisoformat(payload.tour_date)
            except ValueError:
                raise HTTPException(400, 'Неверный формат даты')
            if day < datetime.now(ZoneInfo('Asia/Colombo')).date():
                raise HTTPException(400, 'Дата уже прошла')
            if not scheduled_date_allowed(payload.tour_id, day):
                raise HTTPException(400, 'Эта дата недоступна для выбранной экскурсии')
        if payload.tour_id == 'rafting' and payload.children:
            raise HTTPException(400, 'Рафтинг доступен только с 18 лет')
        if not payload.resort.strip():
            raise HTTPException(400, 'Укажите курорт или «Пока не знаю»')
        if not payload.contact.strip() and not user.get('username'):
            raise HTTPException(400, 'Укажите Telegram или телефон для ответа')
        with sqlite3.connect(cfg.db_path) as conn:
            cur = conn.execute('''INSERT INTO inquiries
                (tour_id,tour_date,adults,children,resort,contact,tg_id,username,source,created_at)
                VALUES (?,?,?,?,?,?,?,?,?,?)''', (
                payload.tour_id, payload.tour_date, payload.adults, payload.children,
                payload.resort.strip(), payload.contact.strip(), user['id'],
                user.get('username',''), payload.source, datetime.now(ZoneInfo('UTC')).isoformat()))
            inquiry_id = cur.lastrowid
        text = (
            f'Новый запрос №{inquiry_id} — не подтверждённая бронь\n'
            f'Тур: {TOURS[payload.tour_id]}\n'
            f'Дата: {payload.tour_date or "Пока не определился"}\n'
            f'Взрослые: {payload.adults}; дети: {payload.children}\n'
            f'Курорт: {payload.resort.strip()}\n'
            f'Контакт: {payload.contact.strip() or "@" + user.get("username", "")}\n'
            f'Telegram ID: {user["id"]}\nИсточник: {payload.source}'
        )
        notified = False
        try:
            async with httpx.AsyncClient(timeout=10) as client:
                response = await client.post(
                    f'https://api.telegram.org/bot{cfg.bot_token}/sendMessage',
                    json={'chat_id': cfg.admin_chat_id, 'text': text})
                notified = response.status_code == 200 and response.json().get('ok') is True
        except Exception:
            logging.getLogger(__name__).warning('Inquiry %s saved; notification failed', inquiry_id)
        if notified:
            with sqlite3.connect(cfg.db_path) as conn:
                conn.execute('UPDATE inquiries SET notification_sent=1 WHERE id=?', (inquiry_id,))
        return {'ok': True, 'id': inquiry_id, 'notification_sent': notified}
