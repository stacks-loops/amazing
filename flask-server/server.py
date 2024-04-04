from flask import Flask 

app = Flask(__name__)

#users API route

@app.route("/users")
def users():
    return {"users": ["User1", "User2", "User3"]}

if __name__ == "__main__":
    app.run(debug=True)
