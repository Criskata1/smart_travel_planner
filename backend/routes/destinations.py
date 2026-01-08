from flask import Blueprint, request, jsonify

dest_bp = Blueprint('destinations', __name__)

destinations_data = {
    # Europe
    "Paris": [
        {"name": "Eiffel Tower", "location": "Champ de Mars", "type":"Landmark", "lat":48.8584,"lon":2.2945},
        {"name": "Louvre Museum", "location": "Rue de Rivoli", "type":"Museum", "lat":48.8606,"lon":2.3376},
        {"name": "Luxembourg Gardens", "location": "6th arrondissement", "type":"Park", "lat":48.8462,"lon":2.3372},
        {"name": "Notre-Dame Cathedral", "location": "Île de la Cité", "type":"Landmark", "lat":48.8530,"lon":2.3499},
        {"name": "Montmartre", "location": "18th arrondissement", "type":"Landmark", "lat":48.8867,"lon":2.3431},
        {"name": "Musée d'Orsay", "location": "7th arrondissement", "type":"Museum", "lat":48.8600,"lon":2.3266}
    ],
    "London": [
        {"name": "British Museum", "location": "Great Russell St", "type":"Museum", "lat":51.5194,"lon":-0.1270},
        {"name": "Tower Bridge", "location": "River Thames", "type":"Landmark", "lat":51.5055,"lon":-0.0754},
        {"name": "Hyde Park", "location": "Central London", "type":"Park", "lat":51.5074,"lon":-0.1657},
        {"name": "Buckingham Palace", "location": "Westminster", "type":"Landmark", "lat":51.5014,"lon":-0.1419},
        {"name": "Tate Modern", "location": "Bankside", "type":"Museum", "lat":51.5076,"lon":-0.0994},
        {"name": "Regent's Park", "location": "NW1", "type":"Park", "lat":51.5313,"lon":-0.1569}
    ],
    "Rome": [
        {"name": "Colosseum", "location": "Piazza del Colosseo", "type":"Landmark", "lat":41.8902,"lon":12.4922},
        {"name": "Vatican Museums", "location": "Vatican City", "type":"Museum", "lat":41.9065,"lon":12.4536},
        {"name": "Villa Borghese", "location": "Rome", "type":"Park", "lat":41.9132,"lon":12.4922},
        {"name": "Pantheon", "location": "Piazza della Rotonda", "type":"Landmark", "lat":41.8986,"lon":12.4768},
        {"name": "Piazza Navona", "location": "Rome", "type":"Landmark", "lat":41.8992,"lon":12.4731}
    ],
    "Berlin": [
        {"name": "Brandenburg Gate", "location": "Pariser Platz", "type":"Landmark", "lat":52.5163,"lon":13.3777},
        {"name": "Pergamon Museum", "location": "Museum Island", "type":"Museum", "lat":52.5211,"lon":13.3969},
        {"name": "Tiergarten", "location": "Berlin", "type":"Park", "lat":52.5145,"lon":13.3501},
        {"name": "Berlin Cathedral", "location": "Museum Island", "type":"Landmark", "lat":52.5192,"lon":13.4010},
        {"name": "East Side Gallery", "location": "Mühlenstraße", "type":"Landmark", "lat":52.5050,"lon":13.4397}
    ],
    "Barcelona": [
        {"name": "Sagrada Familia", "location": "Eixample", "type":"Landmark", "lat":41.4036,"lon":2.1744},
        {"name": "Park Güell", "location": "Gràcia", "type":"Park", "lat":41.4145,"lon":2.1527},
        {"name": "Picasso Museum", "location": "La Ribera", "type":"Museum", "lat":41.3853,"lon":2.1800},
        {"name": "Casa Batlló", "location": "Passeig de Gràcia", "type":"Landmark", "lat":41.3917,"lon":2.1649},
        {"name": "La Rambla", "location": "Ciutat Vella", "type":"Landmark", "lat":41.3809,"lon":2.1734}
    ],
    # Asia
    "Tokyo": [
        {"name": "Tokyo Tower", "location": "Minato", "type":"Landmark", "lat":35.6586,"lon":139.7454},
        {"name": "Ueno Park", "location": "Taito", "type":"Park", "lat":35.7148,"lon":139.7745},
        {"name": "Tokyo National Museum", "location": "Ueno Park", "type":"Museum", "lat":35.7188,"lon":139.7765},
        {"name": "Shinjuku Gyoen", "location": "Shinjuku", "type":"Park", "lat":35.6852,"lon":139.7100},
        {"name": "Meiji Shrine", "location": "Shibuya", "type":"Landmark", "lat":35.6764,"lon":139.6993}
    ],
    "Bangkok": [
        {"name": "Grand Palace", "location": "Phra Nakhon", "type":"Landmark", "lat":13.7500,"lon":100.4913},
        {"name": "Chatuchak Park", "location": "Chatuchak", "type":"Park", "lat":13.8030,"lon":100.5545},
        {"name": "Bangkok Art and Culture Centre", "location": "Pathum Wan", "type":"Museum", "lat":13.7465,"lon":100.5340},
        {"name": "Wat Arun", "location": "Thonburi", "type":"Landmark", "lat":13.7437,"lon":100.4889},
        {"name": "Lumphini Park", "location": "Pathum Wan", "type":"Park", "lat":13.7300,"lon":100.5410}
    ],
    "Singapore": [
        {"name": "Marina Bay Sands", "location": "Marina Bay", "type":"Landmark", "lat":1.2834,"lon":103.8607},
        {"name": "Gardens by the Bay", "location": "Marina Bay", "type":"Park", "lat":1.2816,"lon":103.8636},
        {"name": "National Gallery Singapore", "location": "City Hall", "type":"Museum", "lat":1.2896,"lon":103.8510},
        {"name": "Sentosa Island", "location": "Sentosa", "type":"Landmark", "lat":1.2494,"lon":103.8303},
        {"name": "Botanic Gardens", "location": "Tanglin", "type":"Park", "lat":1.3138,"lon":103.8152}
    ],
    "Dubai": [
        {"name": "Burj Khalifa", "location": "Downtown Dubai", "type":"Landmark", "lat":25.1972,"lon":55.2744},
        {"name": "Dubai Miracle Garden", "location": "Al Barsha South", "type":"Park", "lat":25.0565,"lon":55.2469},
        {"name": "Dubai Museum", "location": "Al Fahidi Fort", "type":"Museum", "lat":25.2635,"lon":55.2972},
        {"name": "Burj Al Arab", "location": "Jumeirah", "type":"Landmark", "lat":25.1413,"lon":55.1853},
        {"name": "Jumeirah Beach", "location": "Dubai", "type":"Park", "lat":25.1410,"lon":55.1850}
    ],
    "Beijing": [
        {"name": "Great Wall at Badaling", "location": "Badaling", "type":"Landmark", "lat":40.3600,"lon":116.0200},
        {"name": "Beihai Park", "location": "Xicheng", "type":"Park", "lat":39.9255,"lon":116.3895},
        {"name": "National Museum of China", "location": "Tiananmen Square", "type":"Museum", "lat":39.9050,"lon":116.3980},
        {"name": "Forbidden City", "location": "Dongcheng", "type":"Landmark", "lat":39.9163,"lon":116.3972},
        {"name": "Temple of Heaven", "location": "Dongcheng", "type":"Landmark", "lat":39.8822,"lon":116.4066}
    ],
    # North America
    "New York": [
        {"name": "Statue of Liberty", "location": "Liberty Island", "type":"Landmark", "lat":40.6892,"lon":-74.0445},
        {"name": "Metropolitan Museum of Art", "location": "1000 5th Ave", "type":"Museum", "lat":40.7794,"lon":-73.9632},
        {"name": "Central Park", "location": "Manhattan", "type":"Park", "lat":40.7851,"lon":-73.9683},
        {"name": "Times Square", "location": "Manhattan", "type":"Landmark", "lat":40.7580,"lon":-73.9855},
        {"name": "Brooklyn Botanic Garden", "location": "Brooklyn", "type":"Park", "lat":40.6676,"lon":-73.9630}
    ],
    "Los Angeles": [
        {"name": "Hollywood Sign", "location": "Hollywood Hills", "type":"Landmark", "lat":34.1341,"lon":-118.3217},
        {"name": "Griffith Park", "location": "Los Angeles", "type":"Park", "lat":34.1366,"lon":-118.2942},
        {"name": "Getty Center", "location": "Brentwood", "type":"Museum", "lat":34.0780,"lon":-118.4741},
        {"name": "Santa Monica Pier", "location": "Santa Monica", "type":"Landmark", "lat":34.0094,"lon":-118.4973},
        {"name": "Los Angeles County Museum", "location": "Exposition Park", "type":"Museum", "lat":34.0638,"lon":-118.3589}
    ],
    "Toronto": [
        {"name": "CN Tower", "location": "Downtown Toronto", "type":"Landmark", "lat":43.6426,"lon":-79.3871},
        {"name": "High Park", "location": "Toronto", "type":"Park", "lat":43.6465,"lon":-79.4637},
        {"name": "Royal Ontario Museum", "location": "Downtown Toronto", "type":"Museum", "lat":43.6677,"lon":-79.3948},
        {"name": "Distillery District", "location": "Toronto", "type":"Landmark", "lat":43.6503,"lon":-79.3591},
        {"name": "Toronto Islands", "location": "Toronto", "type":"Park", "lat":43.6205,"lon":-79.3783}
    ],
    "Mexico City": [
        {"name": "Zócalo", "location": "Centro Histórico", "type":"Landmark", "lat":19.4326,"lon":-99.1332},
        {"name": "Chapultepec Park", "location": "Miguel Hidalgo", "type":"Park", "lat":19.4204,"lon":-99.1810},
        {"name": "National Museum of Anthropology", "location": "Chapultepec", "type":"Museum", "lat":19.4260,"lon":-99.1860},
        {"name": "Palacio de Bellas Artes", "location": "Centro Histórico", "type":"Landmark", "lat":19.4352,"lon":-99.1418},
        {"name": "Frida Kahlo Museum", "location": "Coyoacán", "type":"Museum", "lat":19.3558,"lon":-99.1627}
    ],
    # Oceania
    "Sydney": [
        {"name": "Sydney Opera House", "location": "Bennelong Point", "type":"Landmark", "lat":-33.8568,"lon":151.2153},
        {"name": "Royal Botanic Garden", "location": "Sydney", "type":"Park", "lat":-33.8642,"lon":151.2166},
        {"name": "Art Gallery of NSW", "location": "The Domain", "type":"Museum", "lat":-33.8688,"lon":151.2170},
        {"name": "Bondi Beach", "location": "Bondi", "type":"Landmark", "lat":-33.8915,"lon":151.2767},
        {"name": "Taronga Zoo", "location": "Mosman", "type":"Landmark", "lat":-33.8431,"lon":151.2410}
    ]
}

# Endpoint за търсене на дестинации
@dest_bp.route("/search")
def search_destinations():
    city = request.args.get("city")
    city = city.strip() if city else ""
    if city in destinations_data:
        return jsonify({"destinations": destinations_data[city]})
    else:
        return jsonify({"destinations": []})
