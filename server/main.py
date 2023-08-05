from sql_request import find_instances
from entity_retrieval import retrieve_entities_from_query
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import env, fastapi_config


app = FastAPI(**fastapi_config)

app.add_middleware(
    CORSMiddleware,
    allow_origins=env.CORS_ORIGINS,
    allow_methods=env.CORS_METHODS,
    allow_headers=env.CORS_HEADERS,
    allow_credentials=True,
)


class UserPreference(BaseModel):
    user_preference: str
    user_latitude: float
    user_longitude: float


@app.post("/recommend")
async def get_recommendations(input: UserPreference):
    user_preference = input.user_preference
    entities = retrieve_entities_from_query(user_preference)
    print("Entities:\n", entities)
    context = find_instances(
        entities, user_latitude=input.user_latitude, user_longitude=input.user_longitude
    )
    print("Context: ", context)
    # response = recommend(context)
    return context
