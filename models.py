import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv
# from supabase import create_client

# load_dotenv()


db = SQLAlchemy()
app = Flask(__name__)

# # Use environment variables for Supabase connection
# url = os.environ.get("SUPABASE_URL")
# key = os.environ.get("SUPABASE_KEY")

# supabase = create_client(url, key)

# print(url)
# print(key)

# Set the SQLALCHEMY_DATABASE_URI using the environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:Vasantharajan#00@db.dovsdgqpanrgzeieqgmd.supabase.co:5432/postgres"

db.init_app(app)

class supabaseUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    password = db.Column(db.String)

with app.app_context():
    db.create_all()
