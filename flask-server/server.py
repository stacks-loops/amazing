from flask import Flask, jsonify

app = Flask(__name__)

#users API route

@app.route('/users')
def users():
    return {"users": ["Ragnarok", "Violet", "parker", "jason"]}

if __name__ == "__main__":
    app.run(debug=True)
