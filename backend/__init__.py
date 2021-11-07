from datetime import timedelta
from dotenv.main import find_dotenv
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from os import environ

db = SQLAlchemy()
cors= CORS()

def create_app():
   
    from .auth import auth
    from .profile import profile
    from .view import view
    from .models import User
    app = Flask(__name__)

    load_dotenv(find_dotenv())

    app.config['SECRET_KEY'] = environ.get('SECRET_KEY') or 'thesecret'
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY') or 'the blank'
    app.config['JWT_TOKEN_LOCATION'] = ["cookies"]
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

    # initilizing the database
    db.init_app(app)
    #jwtmanager intit
    jwt= JWTManager(app)

    @jwt.user_identity_loader
    def user_identity_loader(user):
        return user.id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header,jwt_data):
        identity = jwt_data['sub']
        return User.query.filter_by(id=identity).one_or_none()

    #Initilizing CORS so that the api_tool can work
    # Cross origin resource sharing 
    cors.init_app(app)

    app.register_blueprint(auth,url_prefix='/auth')
    app.register_blueprint(view,url_prefix="/view")
    app.register_blueprint(profile,url_prefix='/update')
    
    with app.app_context():
        db.create_all()

    return app

    