#!/usr/bin/env python3
from config import db

user_patient_association = db.Table(
    'user_patient_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('patient_id' db.Integer, db.ForeignKey('patient.id'))
)