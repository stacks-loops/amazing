# amazing
Just updating the ol readme
https://www.youtube.com/watch?v=7LNl2JlZKHA

Install Python
Install VisualStudio
Create a GitHub
Create a new GitHub repository
Follow Instructions 

Open Terminal on your machine
Navigate to the folder you want to save it in
Type git clone paste url
Enter
Type cd then the name of the file
Enter
File will open in VS Code
Press command J to open terminal in file
Follow instructions on git
	% echo "# amazing" >> README.md
	git init
	git add README.md
	git commit -m "first commit"
	git branch -M main
	git remote add origin git@github.com:stacks-loops/amazing.git
	git push -u origin main

Type pipenv install in terminal in vscode
Enter

pipenv install flask
pipenv install flask-bcrypt
pipenv install flask-sqlalchemy

Create
- Server folder 
- server.py
- app.py
- models.py
- seed.py

Create the front-end = type npx create-react-app client
Download will take some time

Create the components as .js files
Type Pip install requests

Add 
#!/usr/bin/env python3
To the top of each .py file (Shebang)

In flask-server in the terminal
Create the environment - Type python 3 -m venv venv
Activate the environment - source venv/bin/activate
Install Flask - type pip3 install Flask

type
 brew install --cask db-browser-for-sqlite
# Standard library imports

# Remote library imports

from flask import Flask
from flask_cors import CORS
from flaskmigrate import Migrate 
from flaskrestful import Api f
rom flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import MetaData 
from flask_bcrypt import Bcrypt

# Local imports

# Instantiate app, set attributes

app = Flask(__name) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.json.compact = False

# Define metadata, instantiate db

metadata = MetaData(naming_convention={ 
"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s", 
}) 
db = SQLAlchemy(metadata=metadata) 
migrate = Migrate(app, db) 
db.init_app(app)

# Instantiate REST API

api = Api(app)

# Instantiate CORS

CORS(app)

# Instantitate Bcrypt for password hashing

bcrypt = Bcrypt(app)

Then pipenv install everyhting

SETTING UP THE BACKEND

In your main backend folder

```
from flask import Flask



app = Flask(__name__)

  

#users API route

  

@app.route("/users")
def users():
	return {"users": ["User1", "User2", "User3"]}

  

if __name__ == "__main__":
app.run(debug=True)
```

Run the server (will automatically be on localhost:5000) port is 5000
Go into server terminal and type python3 server.py

Type localhost:5000/users into browser and you should see this on the page
```
{
  "users": [
    "User1",
    "User2",
    "User3"
  ]
}
```

SETUP THE FRONTED

Go to package.json in the client directory which lists all the packages that are installed in our frontend as well as track data associated with the frontend

Configure the proxy to connect the frontend to backend
Add this on a new line after "private": true,
- "proxy": "http://localhost:5000",
```
{

"name": "client",
"version": "0.1.0",
"private": true,
"proxy": "http://localhost:5000",
"dependencies": {
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"
```

Go to the App.js file and delete all the starter code in there
Make sure to install this extenstion
https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

In the file type "rfce" and enter
add {useState, useEffect} to your import
```
import React, {useState, useEffect} from 'react'

  

function App() {

return (

<div>App</div>

)

}

  

export default App
```

You will have this code now

git add .
git commit -m "backend and frontend work"
git push
Go to GitHub and create a new branch
Go back to your client terminal in vscode and type
git pull
git checkout "whatever you named your branch"

Start your Frontend server
Got to your client side terminal
Type cd client
Type npm start
This should automatically open up localhost:3000 in your browser as a blank page
This is a good time to open a new terminal in vscode, rename it "git" and use that for commits

Add this code to fetch the API, this should show the json data that we hardcoded

```
useEffect(() => {
	fetch("/users").then(
	res => res.json()
	).then(
		data => {
			setData(data)
			console.log(data)
		}
	)
}, [])

```

NOTE!!!
If you are getting a Proxy error you may need to change your proxy to reflect the number at the beginning of the error reported in your server terminal. Mine was 127.0.0.1


"proxy": "http://127.0.0.1:5000",

The add the code in our return statement to render it onto the page here is the full code
```
import React, {useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState({users: [] })

  

  useEffect(() => {

	fetch("/users")
	.then(res => {
	if (!res.ok) {
	throw new Error("Network response was in fact not okay")
	
	}
	
	return res.json()
	})
	
	.then(data => {
	setData(data)
	
	console.log(data)
	
	})
	
	.catch(error => {
	console.error('Error fetching data:', error)
	
	})
	
	}, [])
	
	return (
	<div>
	<h1> Users: </h1>
	<ul>
	{data.users.map((user, index) => (
	<li key={index}>{user}</li>
	
	))}
	</ul>
	</div>
	
	)}

export default App

```

DEFINE DATABASE MODELS

Make sure SQLAlchemy is installed by typing pip install Flask SQLAlchemy
We now want to create our models in models.py in our backend (flask-server)
Open models.py file

type this code
```
#!/usr/bin/env python3

from config import db

#create the table that will establish the many to many relationship between user and patient. It has a user columnn, and a patient column.
user_patient_association = db.Table(
'user_patient_association',
db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
db.Column('patient_id', db.Integer, db.ForeignKey('patient.id'))
)

  
#This class represents our users. We make it a SQLAlchemy model by putting db.Model in parentheses after creating. It has an id column, and a username column.
class User(db.Model):
id = db.Column(db.Integer, primary_key=True)
username = db.Column(db.String(50), unique=True, nullable=False)
# add the rest of attributes and auth stuff here

  
#Same basically
class Patient(db.Model):
id = db.Column(db.Integer, primary_key=True)
first_name = db.Column(db.String(50), unique=True, nullable=False)
# add the rest of attributes and auth stuff here


#relationships
#We define our many to many relationship between user and patient here
#It is defined in our User class, and specifies 'User' as the target of the
#relationship. The secondary targets the association table we created. Then
# we use backref to create the relationship from 'User' objects back over 
# to patient objects which gives a user access to patients they are associated
# with. 
users = db.relationship('User', secondary=user_patient_association, backref=db.backref('patients', lazy='dynamic'))

```

Next we need to edit our Flask App which we have in server.py make the changes necessary in your file.
```
from flask import Flask, jsonify
from config import app, db
from models import User, Patient

app = Flask(__name__)

#users API route
@app.route('/users')
def users():
users = User.query.all()
return jsonify({'users': [user.username for user in users]})

if __name__ == "__main__":
app.run(debug=True)

```

Kill your backend server by pressing the trash icon and start a new terminal
type cd flask-server
type python3 server.py

If you get errors about missing modules go into config.py and look for squiggly underlines, then 
type pip install flask-"name of what is missing" 

and app.db file should pop up in your directory on the left. Right-click on that and press
Open Database (must have SQLite Explorer installed)

Now in the bottom left SQLite explorer should pop up. Click that

INSPECT THE DATABASE
Open a new terminal and type cd flask-server
type export FLASK_APP=app.py to specify the app name
type FLASK_RUN_PORT=5000
type FLASK_DEBUG=true
type flask db init
type flask db migrate
type flask db upgrade

Go to instance in the flask-server directory and right click open database

this is to get to green
so im tyoing a bunch of nothing
That will look good 
to potential employers
I di work sinvce 4am
so I have no problem 
having my contributions get to green
in this
manner

