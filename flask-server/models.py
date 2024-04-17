#!/usr/bin/env python3
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()
# this will generate a unique id
def get_uuid():
    return uuid4().hex

user_patient_association = db.Table(
    'user_patient_association',
    db.Column('user_id', db.String(32), db.ForeignKey('users.id')),
    db.Column('patient_id', db.Integer, db.ForeignKey('patients.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    # default id will be generated if none
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    # max email chars is 345
    email = db.Column(db.String(345), unique=True)
    # username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(225), nullable=False)
    relationship = db.Column(db.String)
    # add the rest of attributres and auth stuff here
    patients = db.relationship('Patient', secondary=user_patient_association, backref='users')
    class Serializer:
        exclude = ('password',)

class Patient(db.Model, SerializerMixin):
    __tablename__ = "patients"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    birthday = db.Column(db.String)
    age = db.Column(db.Integer)
    patient_phone = db.Column(db.Integer)
    patient_email = db.Column(db.String, nullable=False)
    patient_address =db.Column(db.String(150), nullable=False)
    hospital_name = db.Column(db.String(50), nullable=False)
    room_number = db.Column(db.Integer)
    health_concerns = db.Column(db.String)

    serialize_rules = ("-users.patients",)

hospital_nurse_association = db.Table(
    "hospital_nurse_association",
    db.Column("hospital_id", db.Integer, db.ForeignKey("hospitals.id")),
    db.Column("nurse_id", db.Integer, db.ForeignKey("nurses.id")),
)

class Nurse(db.Model, SerializerMixin):
    __tablename__ = "nurses"
    id = db.Column(db.Integer, primary_key=True)
    nurse_name = db.Column(db.String(50))

    hospitals = db.relationship(
        "Hospital", secondary="hospital_nurse_association", backref="nurses"
    )
    class Serializer:
        pass

class Hospital(db.Model, SerializerMixin):
    __tablename__ = "hospitals"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    class Serializer:
        pass
    @property 
    def associated_nurses(self):
        return self.nurses.all()

#relationsips

users = db.relationship('User', secondary=user_patient_association, backref=db.backref('patients', lazy='dynamic'))