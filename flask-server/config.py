from dotenv import load_dotenv
import os
import redis

load_dotenv()



class ApplicationConfig:
# add secret key from env

    SECRET_KEY = os.environ["SECRET_KEY"]
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    # no loading message
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # will 'echo ' what is happening in the database
    SQLALCHEMY_ECHO = True

    #session tpye set as redis, (should I set persist to true? ask Emiley)
    #enable session signing for redis and connect to redis server
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")



