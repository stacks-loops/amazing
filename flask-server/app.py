
from flask import Flask, request, abort, jsonify
from config import ApplicationConfig
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
# from flask_sqlalchemy import SQLAlchemy

# Instantiate app, set attributes
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

db.init_app(app)

# create tables
with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

api = Api(app)

# Instantiate CORS
CORS(app)


# Instantiate bcrypt 
bcrypt = Bcrypt(app)

#register new user route
@app.route('/register')
def register_user():
    data = request.json
    email = data.get("email")
    password = data.get["password"]

    # check if user exists
    user_exists = User.query.filter(email=email).first() is not None

    # abort if conflict in current state of the resource 409
    if user_exists:
        abort(409)

    # use bcrpyt to hash the password
    hashed_password = bcrypt.generate_password_hash(password)
    #create a new user
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    }) 

if __name__ == "__main__":
    app.run(debug=True)

# Instantiate REST API
#users API route

# @app.route('/users')
# def users():
#     users = User.query.all()
#     return jsonify({'users': [user.username for user in users]})