from flask import Flask, jsonify
from config import app
from models import User

#users API route

@app.route('/users')
def users():
    users = User.query.all()
    return jsonify({'users': [user.username for user in users]})

if __name__ == "__main__":
    app.run(debug=True)
