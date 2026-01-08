from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from backend.database import db
from backend.models import Trip, Activity, UserHistory
import json

itinerary_bp = Blueprint('itinerary', __name__)

# ----------------------
# Helper functions
# ----------------------
def score_itinerary(activities, preferences):
    score = 0
    for act in activities:
        # Interests
        if 'nature' in preferences.get('interests', []) and 'nature' in act.get('tags', []):
            score += 2
        # Budget
        if act.get('cost', 0) <= preferences.get('budget', float('inf')):
            score += 1
        # Time
        if act.get('duration', 0) <= preferences.get('max_time', float('inf')):
            score += 1
    return score


def save_user_history(user_id, itinerary):
    history = UserHistory(
        user_id=user_id,
        itinerary_json=json.dumps(itinerary)
    )
    db.session.add(history)
    db.session.commit()


def recommend_destinations(top_n=5):
    from backend.models import Destination
    all_dest = Destination.query.order_by(Destination.rating.desc()).all()
    recommended = all_dest[:top_n]
    return [{"id": d.id, "name": d.name, "rating": d.rating} for d in recommended]


# ----------------------
# Routes
# ----------------------
@itinerary_bp.route('/trip', methods=['POST'])
@jwt_required()
def create_trip():
    user_id = get_jwt_identity()
    data = request.json
    trip = Trip(
        name=data["name"],
        start_date=datetime.strptime(data["startDate"], "%Y-%m-%d"),
        end_date=datetime.strptime(data["endDate"], "%Y-%m-%d"),
        user_id=user_id
    )
    db.session.add(trip)
    db.session.commit()
    return jsonify({"msg": "Trip created", "trip_id": trip.id})


@itinerary_bp.route('/trip/<int:trip_id>/activity', methods=['POST'])
@jwt_required()
def add_activity(trip_id):
    user_id = get_jwt_identity()
    trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first()
    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    data = request.json
    activity = Activity(
        name=data["name"],
        location=data["location"],
        day=data["day"],
        trip_id=trip.id,
        cost=data.get("cost", 0),
        duration=data.get("duration", 1),
        tags=data.get("tags", [])
    )
    db.session.add(activity)
    db.session.commit()

    # Save user history & scoring
    all_activities = Activity.query.filter_by(trip_id=trip.id).all()
    itinerary_data = [{"name": a.name, "location": a.location, "day": a.day, "cost": a.cost, "tags": a.tags} for a in all_activities]

    preferences = {
        "interests": data.get("user_interests", []),
        "budget": data.get("user_budget", None),
        "max_time": data.get("user_max_time", None)
    }
    score = score_itinerary(itinerary_data, preferences)
    save_user_history(user_id, itinerary_data)

    return jsonify({
        "msg": "Activity added",
        "trip_score": score,
        "recommended": recommend_destinations()
    })


@itinerary_bp.route('/cities')
def get_cities():
    # Hardcoded city list - you can replace with DB query if needed
    cities = [
        {'name': 'Paris', 'id': 'Paris'},
        {'name': 'Rome', 'id': 'Rome'},
        {'name': 'London', 'id': 'London'},
        {'name': 'Berlin', 'id': 'Berlin'},
        {'name': 'Barcelona', 'id': 'Barcelona'},
        {'name': 'Tokyo', 'id': 'Tokyo'},
        {'name': 'Bangkok', 'id': 'Bangkok'},
        {'name': 'Singapore', 'id': 'Singapore'},
        {'name': 'Dubai', 'id': 'Dubai'},
        {'name': 'Beijing', 'id': 'Beijing'},
        {'name': 'New York', 'id': 'New York'},
        {'name': 'Los Angeles', 'id': 'Los Angeles'},
        {'name': 'Toronto', 'id': 'Toronto'},
        {'name': 'Mexico City', 'id': 'Mexico City'},
        {'name': 'Sydney', 'id': 'Sydney'}
    ]
    return jsonify({"cities": cities})
