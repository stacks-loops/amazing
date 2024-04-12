#!/usr/bin/env python3
from config import db, bcrypt

user_patient_association = db.Table(
    'user_patient_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('patient_id', db.Integer, db.ForeignKey('patient.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    # add the rest of attributres and auth stuff here

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), unique=True, nullable=False)
    # add the rest of attributres and auth stuff here

#realtionsips
    users = db.relationship('User', secondary=user_patient_association, backref=db.backref('patients', lazy='dynamic'))