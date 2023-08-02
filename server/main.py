from sql_request import find_instances
from entity_retrieval import retrieve_entities_from_query
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from config import env
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=env.CORS_ORIGINS,
    allow_methods=env.CORS_METHODS,
    allow_headers=env.CORS_HEADERS,
    allow_credentials=True,
)


class LocationData(BaseModel):
    user_latitude: float
    user_longitude: float
    place_type: str
    cuisine: str
    radius: float
    price: int
    rating: float


@app.post("/recommend")
def get_recommendations(location_data: LocationData):
    # user_latitude = location_data.user_latitude
    # user_longitude = location_data.user_longitude
    # entities = """
    # 1) Тип заведения:кафе;
    # 2) Кухня:-;
    # 3) Местоположение:2;
    # 4) Ценовой диапазон:3000;
    # 5) Рейтинг и кол-во отзывов:3/-;
    # """
    # entities_by_lines = entities.split("\n")
    # entities_by_lines = [line.strip() for line in entities_by_lines]

    instances_by_type = find_instances(location_data)
    return instances_by_type
