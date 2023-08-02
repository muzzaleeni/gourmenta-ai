import sqlite3
from math import radians, sin, cos, sqrt, atan2


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


def find_instances(location_data):
    user_latitude = location_data.user_latitude
    user_longitude = location_data.user_longitude
    place_type = location_data.place_type
    cuisine = location_data.cuisine
    radius = location_data.radius
    price = location_data.price
    rating = location_data.rating

    connection = sqlite3.connect(
        "/Users/muzzyaqow/Documents/projects/Gourmenta/server/identifier.sqlite"
    )
    cursor = connection.cursor()

    # Execute the main SQL query to fetch the results
    queries = []
    params = []

    if place_type:
        query = "SELECT [2GIS URL] FROM Restaurants WHERE Description LIKE ?"
        queries.append(query)
        params.append(f"%{place_type}%")

    if cuisine:
        query = (
            'SELECT [2GIS URL] FROM Restaurants WHERE "Additional Information" LIKE ?'
        )
        queries.append(query)
        params.append(f"%{cuisine}%")

    if radius:
        try:
            parsed_distance = float(radius)
            query = "SELECT [2GIS URL], Latitude, Longitude FROM Restaurants"
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

            query = (
                "SELECT [2GIS URL] FROM Restaurants WHERE [2GIS URL] IN ({})".format(
                    ", ".join(["?"] * len(nearby_restaurants))
                )
            )
            queries.append(query)
            params.extend(nearby_restaurants)

        except ValueError:
            pass

    if price:
        try:
            parsed_number = int(price)
            query = (
                "SELECT [2GIS URL] FROM Restaurants WHERE "
                '"Additional Information" LIKE ? '
                'AND CAST(SUBSTR("Additional Information", '
                "INSTR(\"Additional Information\", 'Средний чек') + 11) AS INTEGER) <= ?"
            )
            queries.append(query)
            params.append("%Средний чек%")
            params.append(parsed_number)
        except ValueError:
            pass

    if rating:
        try:
            query = "SELECT [2GIS URL] FROM Restaurants WHERE Rating >= ?"
            queries.append(query)
            params.append(rating)
        except ValueError:
            pass

    # Combine the filter subqueries using INTERSECT
    if queries:
        whole_query = " INTERSECT ".join(queries)

        # Prepare parameterized query and execute
        cursor.execute(whole_query, params)

        # Fetch and display the final results
        final_results = cursor.fetchall()

        cursor.close()
        connection.close()

        return final_results

    return []
