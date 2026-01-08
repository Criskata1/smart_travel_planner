from database import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    trips = db.relationship('Trip', backref='user', lazy=True)
    histories = db.relationship('UserHistory', backref='user', lazy=True)


class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_score = db.Column(db.Float, default=0)
    activities = db.relationship('Activity', backref='trip', lazy=True)


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120))
    day = db.Column(db.Integer)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=False)

    # Additional fields for smart functionality
    cost = db.Column(db.Float, default=0)
    duration = db.Column(db.Float, default=1)
    tags = db.Column(db.PickleType, default=[])


class UserHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    itinerary_json = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Destination(db.Model):
    __tablename__ = 'destination'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    rating = db.Column(db.Float, default=0)
    cost = db.Column(db.Float, default=0)
    visit_time = db.Column(db.Float, default=1)  # duration in hours
    tags = db.Column(db.PickleType, default=[])  # e.g., ["nature", "museum"]
    city_id = db.Column(db.String(50), nullable=False)
