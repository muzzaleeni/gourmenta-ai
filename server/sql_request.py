import sqlite3
from math import radians, sin, cos, sqrt, atan2
from typing import List


def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in km
    R = 6371.0

    # Convert latitude and longitude from degrees to radians
    lat1_rad = radians(lat1)
    lon1_rad = radians(lon1)
    lat2_rad = radians(lat2)
    lon2_rad = radians(lon2)

    # Calculate the differences between the latitudes and longitudes
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Haversine formula
    a = sin(dlat / 2) ** 2 + cos(lat1_rad) * cos(lat2_rad) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    # Calculate the distance
    distance = R * c
    return distance


def parse_entities(entities: str) -> List[dict]:
    lines = entities.split("\n")
    parsed_entities = []

    for line in lines:
        [key, value] = line.split(":")
        parsed_entities.append({key: value})

    return parsed_entities


def find_instances(entities, user_latitude, user_longitude):
    parsed_entities = parse_entities(entities)

    print(parsed_entities)

    place_type = str(parsed_entities[0].get("Заведение")).lstrip().lower()
    cuisine = str(parsed_entities[1].get("Кухня")).lstrip().capitalize()
    specific_food = str(parsed_entities[2].get("Конкретная еда")).lstrip().capitalize()
    radius = str(parsed_entities[3].get("Расстояние")).lstrip()
    price = str(parsed_entities[4].get("Цена")).lstrip()
    rating = str(parsed_entities[5].get("Рейтинг")).lstrip()

    print(place_type, cuisine, specific_food, radius, price, rating)
    connection = sqlite3.connect("identifier.sqlite")
    cursor = connection.cursor()

    # Execute the main SQL query to fetch the results
    queries = []
    params = []

    if specific_food != "-":
        query = "SELECT Name, [2GIS URL] FROM Restaurants WHERE [Additional Information] LIKE ?"
        queries.append(query)
        params.append(f"%{specific_food}%")

    if place_type != "-":
        query = "SELECT Name, [2GIS URL] FROM Restaurants WHERE Description LIKE ?"
        queries.append(query)
        params.append(f"%{place_type}%")

    if cuisine != "-":
        query = "SELECT Name, [2GIS URL] FROM Restaurants WHERE [Additional Information] LIKE ?"
        queries.append(query)
        params.append(f"%{cuisine}%")

    if radius != "-":
        try:
            parsed_distance = float(radius)
            query = "SELECT Name, [2GIS URL], Latitude, Longitude FROM Restaurants"
            cursor.execute(query)
            all_restaurants = cursor.fetchall()
            nearby_restaurants = []
            for url, restaurant_lat, restaurant_lon in all_restaurants:
                distance_to_restaurant = haversine(
                    user_latitude,
                    user_longitude,
                    restaurant_lat,
                    restaurant_lon,
                )
                if distance_to_restaurant <= parsed_distance:
                    nearby_restaurants.append(url)

            query = "SELECT Name, [2GIS URL] FROM Restaurants WHERE [2GIS URL] IN ({})".format(
                ", ".join(["?"] * len(nearby_restaurants))
            )
            queries.append(query)
            params.extend(nearby_restaurants)

        except ValueError:
            pass

    if price != "-":
        try:
            parsed_number = int(price)
            query = (
                "SELECT Name, [2GIS URL] FROM Restaurants WHERE "
                '"Additional Information" LIKE ? '
                'AND CAST(SUBSTR("Additional Information", '
                "INSTR(\"Additional Information\", 'Средний чек') + 11) AS INTEGER) <= ?"
            )
            queries.append(query)
            params.append("%Средний чек%")
            params.append(parsed_number)
        except ValueError:
            pass

    if rating != "-":
        try:
            query = "SELECT Name, [2GIS URL] FROM Restaurants WHERE Rating >= ?"
            queries.append(query)
            params.append(rating)
        except ValueError:
            pass

    # Combine the filter subqueries using INTERSECT
    if queries:
        whole_query = " INTERSECT ".join(queries)
        print("Query: ", whole_query)
        # Prepare parameterized query and execute
        cursor.execute(f"{whole_query} LIMIT 5", params)

        # Fetch and display the final results
        final_results = cursor.fetchall()

        cursor.close()
        connection.close()
        return final_results

    return []
