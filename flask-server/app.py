
from flask import Flask, request, jsonify, session
from config import ApplicationConfig
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_restful import Api
from flask_session import Session
# from flask_sqlalchemy import SQLAlchemy


# Instantiate app, set attributes
app = Flask(__name__)
app.config.from_object(ApplicationConfig)
# Instantiate bcrypt 
bcrypt = Bcrypt(app)
server_session = Session(app)

db.init_app(app)

# create tables
with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

api = Api(app)

# Instantiate CORS
CORS(app, supports_credentials=True)

#get current info route
@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    #retrieve the user from db with matching id if it exists
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

#register new user route
@app.route('/signup', methods=["POST"])
def signup_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # check if user exists (will reeturn true)
    user_exists = User.query.filter_by(email=email).first() is not None

    # abort if conflict in current state of the resource 409
    if user_exists:
        return jsonify({"error": "User exists"}), 409

    # use bcrpyt to hash the password
    hashed_password = bcrypt.generate_password_hash(password)
    #create a new user
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    }) 

@app.route("/login", methods=["POST"])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    #if they do not have an account
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    #if password is wrong
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    #store the user id in thes session for authent and authorization
    session["user_id"] = user.id

    #all checkcs out
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)

# Instantiate REST API
#users API route

# @app.route('/users')
# def users():
#     users = User.query.all()
#     return jsonify({'users': [user.username for user in users]})