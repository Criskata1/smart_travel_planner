from flask import Flask, render_template, jsonify
from flask_jwt_extended import JWTManager

from database import db
from routes.auth import auth_bp
from routes.destinations import dest_bp, destinations_data
from routes.itinerary import itinerary_bp
from routes.weather import weather_bp

def create_app():
    app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static"
    )

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_planner.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret-key'

    db.init_app(app)
    JWTManager(app)

    # Register API blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(dest_bp, url_prefix='/api')
    app.register_blueprint(weather_bp, url_prefix='/api')
    app.register_blueprint(itinerary_bp, url_prefix='/api')

    # Serve frontend pages
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/itinerary')
    def itinerary():
        return render_template('itinerary.html')

    @app.route("/api/cities")
    def get_cities():
        return jsonify({"cities": list(destinations_data.keys())})

    with app.app_context():
        # Import models here to register them with SQLAlchemy
        from backend import models
        db.create_all()
        print("Database tables created successfully!")

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
