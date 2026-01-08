import requests
from flask import Blueprint, request, jsonify

weather_bp = Blueprint("weather_bp", __name__)

@weather_bp.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "Missing city parameter"}), 400

    try:
        url = f"http://wttr.in/{city}?format=j1"
        res = requests.get(url, timeout=5)
        if res.status_code != 200:
            return jsonify({"error": "Weather data not available"}), 500

        data = res.json()
        current = data["current_condition"][0]

        weather_info = {
            "city": city,
            "temperature": current["temp_C"],
            "description": current["weatherDesc"][0]["value"]
        }

        return jsonify(weather_info)

    except Exception as e:
        return jsonify({"error": "Weather data not available", "details": str(e)}), 500
