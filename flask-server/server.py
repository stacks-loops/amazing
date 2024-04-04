from flask import Flask, jsonify

app = Flask(__name__)

#users API route

@app.route('/users')
def get_users():
    users = [{"name" : "Rganorak"}, {"name" : "Violet"}]
    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)
