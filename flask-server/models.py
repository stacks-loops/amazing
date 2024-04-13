#!/usr/bin/env python3
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()
# this will generate a unique id
def get_uuid():
    return uuid4().hex

# user_patient_association = db.Table(
#     'user_patient_association',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#     db.Column('patient_id', db.Integer, db.ForeignKey('patient.id'))
# )

class User(db.Model):
    __tablename__ = "users"
    # default id will be generated if none
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    # max email chars is 345
    email = db.Column(db.String(345), unique=True)
    # username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(225), nullable=False)
    # add the rest of attributres and auth stuff here

#     @property
#     def password_hash(self):
#         return self._password_hash
    
#     @password_hash.setter
#     def password_hash(self, password):
#         byte_object = password.encode('utf-8')
#         bcrypt_hash = bcrypt.generate_password_hash(byte_object)
#         hash_object_as_string = bcrypt_hash.decode('utf-8')
#         self._password_hash = hash_object_as_string


# class Patient(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(50), unique=True, nullable=False)
#     # add the rest of attributres and auth stuff here

# #realtionsips
#     users = db.relationship('User', secondary=user_patient_association, backref=db.backref('patients', lazy='dynamic'))