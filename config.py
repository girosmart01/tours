# -*- coding: utf-8 -*-
import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass
class Config:
    bot_token: str
    admin_chat_id: int
    db_path: str
    manager_username: str
    stats_key: str


def load_config() -> Config:
    token = os.getenv("BOT_TOKEN")
    admin_id = os.getenv("ADMIN_CHAT_ID")

    if not token:
        raise RuntimeError("BOT_TOKEN не задан в .env")
    if not admin_id:
        raise RuntimeError("ADMIN_CHAT_ID не задан в .env")

    return Config(
        bot_token=token,
        admin_chat_id=int(admin_id),
        db_path=os.getenv("DB_PATH", "bookings.db"),
        manager_username=os.getenv("MANAGER_USERNAME", "your_telegram_username"),
        stats_key=os.getenv("STATS_KEY", ""),
    )
