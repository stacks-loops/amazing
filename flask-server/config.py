from dotenv import load_dotenv
import os
load_dotenv()


class ApplicationConfig:
# add secret key from env

    SECRET_KEY = os.environ["SECRET_KEY"]
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    # no loading message
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # will 'echo ' what is happening in the database
    SQLALCHEMY_ECHO = True





