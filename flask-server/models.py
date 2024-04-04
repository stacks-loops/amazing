#!/usr/bin/env python3
from config import db

user_patient_association = db.Table(
    'user_patient_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('patient_id', db.Integer, db.ForeignKey('patient.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    # add the rest of attributres and auth stuff here