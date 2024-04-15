
from flask import Flask, request, jsonify, session
from config import ApplicationConfig
from models import db, User, Patient, user_patient_association
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_session import Session
# from flask_sqlalchemy import SQLAlchemy
from wtforms import Form, StringField, IntegerField, DateField
from datetime import datetime
import ipdb 


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
CORS(app, origins=['http://localhost:5173'], supports_credentials=True)


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
#define form structure and route for addpatient intake form
@app.route('/add-patient', methods=["POST"])
def add_patient():
    data = request.json

    #dob needs to be chnaged to python
    dob = datetime.strptime(data.get('dob'), '%Y-%m-%d').date()
    try:
        new_patient = Patient(
                first_name=data.get('firstName'),
                last_name=data.get('lastName'),
                dob=dob,
                age=data.get('age'),
                patient_phone=data.get('patientPhone'),
                patient_email=data.get('patientEmail'),
                patient_address=data.get('patientAddress'),
                hospital_name=data.get('hospitalName'),
                room_number=data.get('roomNumber'),
                health_concerns=data.get('healthConcerns')
    )
        db.session.add(new_patient)
        db.session.commit()

        user_id = data.get('user_id')
        if user_id:
            user = User.query.get(user_id)

            if user:
                user.patients.append(new_patient)
                db.session.commit()
            else:
                return jsonify({"error": "user not found"}), 404
        else: 
            return jsonify({"error": "user id not provided"}), 400
        
        return jsonify({"Success": "Patient added succesfully"}), 201


        # user = User.query.filter_by(id=user_id).first()

        # user_patient_entry = user_patient_association.insert().values(user_id=user, patient_id=new_patient.id)
        # db.session.execute(user_patient_entry)
        # db.session.commit()

        # return jsonify({"success": "Patient added succesfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
   
@app.route('/patients', methods=["GET"])
def my_patients():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    ipdb.set_trace()

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    
    patients = user.patients

    patient_data = [patient.to_dict() for patient in patients]

    return jsonify(patient_data)
  

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