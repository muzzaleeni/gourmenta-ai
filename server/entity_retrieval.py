import openai
import os
from dotenv import load_dotenv

load_dotenv()


def retrieve_entities_from_query(query):
    prompt = f"Извлеки из нижепроведенного запроса: 1) тип заведения 2) кухня 3) местоположение 4) ценовой диапазон 5) рейтинг и кол-во отзывов. Не надо ничего додумывать/придумывать. Работай чисто по запросу и ничего лишнего. Если информация отсутствует, то верни знак минуса. Форматируй ответ в виде 1) Тип заведения: ..., новая строка. Запрос:  {query}"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0,
        max_tokens=2000,
    )

    if "choices" in response and len(response["choices"]) > 0:
        entities = response["choices"][0]["text"]
        return entities
    else:
        print(f"Error: Unable to retrieve the entities from the API response.")
        return None
