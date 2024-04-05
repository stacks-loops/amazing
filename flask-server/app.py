from flask import Flask, jsonify
from config import app, db
from models import User, Patient

#users API route

@app.route('/users')
def users():
    users = User.query.all()
    return jsonify({'users': [user.username for user in users]})

if __name__ == "__main__":
    app.run(debug=True)
