import random

# Предефинирани дестинации за няколко големи града
DESTINATIONS = {
    "Paris": [
        {"name": "Eiffel Tower", "location": "Champ de Mars"},
        {"name": "Louvre Museum", "location": "Rue de Rivoli"},
        {"name": "Notre-Dame Cathedral", "location": "Île de la Cité"},
        {"name": "Arc de Triomphe", "location": "Place Charles de Gaulle"},
        {"name": "Montmartre", "location": "18th arrondissement"}
    ],
    "London": [
        {"name": "Big Ben", "location": "Westminster"},
        {"name": "London Eye", "location": "South Bank"},
        {"name": "Tower of London", "location": "Tower Hill"},
        {"name": "Buckingham Palace", "location": "Westminster"},
        {"name": "Hyde Park", "location": "Central London"}
    ],
    "New York": [
        {"name": "Statue of Liberty", "location": "Liberty Island"},
        {"name": "Central Park", "location": "Manhattan"},
        {"name": "Empire State Building", "location": "Midtown"},
        {"name": "Times Square", "location": "Manhattan"},
        {"name": "Brooklyn Bridge", "location": "East River"}
    ],
    "Tokyo": [
        {"name": "Tokyo Tower", "location": "Minato"},
        {"name": "Senso-ji Temple", "location": "Asakusa"},
        {"name": "Shinjuku Gyoen", "location": "Shinjuku"},
        {"name": "Meiji Shrine", "location": "Shibuya"},
        {"name": "Shibuya Crossing", "location": "Shibuya"}
    ],
    "Sofia": [
        {"name": "Alexander Nevsky Cathedral", "location": "Center"},
        {"name": "Vitosha Mountain", "location": "South Sofia"},
        {"name": "National Palace of Culture", "location": "Vitosha Blvd"},
        {"name": "Boyana Church", "location": "Boyana"},
        {"name": "Ivan Vazov National Theatre", "location": "City Garden"}
    ],
    "Barcelona": [
        {"name": "Sagrada Família", "location": "Eixample"},
        {"name": "Park Güell", "location": "Gràcia"},
        {"name": "Casa Batlló", "location": "Passeig de Gràcia"},
        {"name": "La Rambla", "location": "Ciutat Vella"},
        {"name": "Gothic Quarter", "location": "Old Town"}
    ],
    "Dubai": [
        {"name": "Burj Khalifa", "location": "Downtown"},
        {"name": "Palm Jumeirah", "location": "Coast"},
        {"name": "Dubai Mall", "location": "Downtown"},
        {"name": "Dubai Marina", "location": "West Coast"},
        {"name": "Desert Safari", "location": "Dubai Desert"}
    ]
}


def get_available_cities():
    """Return a sorted list of available cities."""
    return sorted(list(DESTINATIONS.keys()))


def get_destinations(city):
    """
    Returns a list of destinations for the specified city.
    If the city is not predefined, generate generic ones.
    """
    city = city.strip().title()
    if city in DESTINATIONS:
        return DESTINATIONS[city]

    # Генерираме измислени атракции за всеки друг град
    attractions = [
        f"{city} Museum",
        f"{city} Central Park",
        f"{city} Historical Square",
        f"{city} Art Gallery",
        f"{city} Grand Cathedral",
        f"{city} City Tower",
        f"{city} Riverside Walk",
        f"{city} Botanical Garden",
        f"{city} Main Plaza",
        f"{city} Cultural Center"
    ]
    num = random.randint(5, 8)
    selected = random.sample(attractions, num)

    return [{"name": name, "location": f"{city} Downtown"} for name in selected]


def get_weather(city):
    """Returns mock weather data for any city."""
    temp = random.randint(-5, 35)
    descriptions = ["sunny", "cloudy", "rainy", "windy", "snowy", "partly cloudy"]
    description = random.choice(descriptions)
    return {
        "city": city.title(),
        "temperature": temp,
        "description": description
    }
