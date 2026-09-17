# -*- coding: utf-8 -*-
import sqlite3
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime


@dataclass
class Booking:
    tour_id: str
    tour_title: str
    tour_date: str  # YYYY-MM-DD
    name: str
    phone: str
    country: str
    hotel: str
    room: str
    tg_id: int
    username: str
    source: str = "direct"


@dataclass
class Visit:
    tg_id: int
    username: str
    country: str
    source: str


def init_db(db_path: str) -> None:
    with _connect(db_path) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tour_id TEXT,
                tour_title TEXT,
                tour_date TEXT,
                name TEXT,
                phone TEXT,
                country TEXT,
                hotel TEXT,
                room TEXT,
                tg_id INTEGER,
                username TEXT,
                source TEXT,
                created_at TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS visits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tg_id INTEGER,
                username TEXT,
                country TEXT,
                source TEXT,
                created_at TEXT
            )
            """
        )
        conn.commit()


def save_booking(db_path: str, b: Booking) -> int:
    with _connect(db_path) as conn:
        cur = conn.execute(
            """
            INSERT INTO bookings (tour_id, tour_title, tour_date, name, phone,
                                   country, hotel, room, tg_id, username, source, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (b.tour_id, b.tour_title, b.tour_date, b.name, b.phone, b.country,
             b.hotel, b.room, b.tg_id, b.username, b.source, datetime.utcnow().isoformat()),
        )
        conn.commit()
        return cur.lastrowid


def export_bookings_csv(db_path: str, out_path: str) -> int:
    import csv
    with _connect(db_path) as conn:
        rows = conn.execute(
            "SELECT id, tour_id, tour_title, tour_date, name, phone, country, "
            "hotel, room, tg_id, username, source, created_at "
            "FROM bookings ORDER BY id DESC"
        ).fetchall()
    header = ["id", "tour_id", "tour_title", "tour_date", "name", "phone",
              "country", "hotel", "room", "tg_id", "username", "source", "created_at"]
    with open(out_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)
    return len(rows)


def log_visit(db_path: str, v: Visit) -> None:
    with _connect(db_path) as conn:
        conn.execute(
            "INSERT INTO visits (tg_id, username, country, source, created_at) "
            "VALUES (?, ?, ?, ?, ?)",
            (v.tg_id, v.username, v.country, v.source, datetime.utcnow().isoformat()),
        )
        conn.commit()


def visit_stats(db_path: str) -> dict:
    with _connect(db_path) as conn:
        total = conn.execute("SELECT COUNT(*) FROM visits").fetchone()[0]
        unique = conn.execute("SELECT COUNT(DISTINCT tg_id) FROM visits").fetchone()[0]
        by_country = conn.execute(
            "SELECT COALESCE(country,'unknown'), COUNT(*) FROM visits "
            "GROUP BY country ORDER BY COUNT(*) DESC"
        ).fetchall()
        by_source = conn.execute(
            "SELECT COALESCE(source,'direct'), COUNT(*) FROM visits "
            "GROUP BY source ORDER BY COUNT(*) DESC"
        ).fetchall()
        bookings_total = conn.execute("SELECT COUNT(*) FROM bookings").fetchone()[0]
    return {
        "total_visits": total,
        "unique_visitors": unique,
        "total_bookings": bookings_total,
        "by_country": [{"country": c, "visits": n} for c, n in by_country],
        "by_source": [{"source": s, "visits": n} for s, n in by_source],
    }


@contextmanager
def _connect(db_path: str):
    conn = sqlite3.connect(db_path)
    try:
        yield conn
    finally:
        conn.close()
