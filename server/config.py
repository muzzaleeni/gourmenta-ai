from typing import Any

from pydantic import BaseSettings


class Config(BaseSettings):
    CORS_ORIGINS: list[str] = [
        "*",
    ]
    CORS_HEADERS: list[str] = ["*"]
    CORS_METHODS: list[str] = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]


# environmental variables
env = Config()

# FastAPI configurations
fastapi_config: dict[str, Any] = {
    "title": "API",
}
