import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
app = Flask(__name__)

# Set the SQLALCHEMY_DATABASE_URI using the environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:Vasantharajan#00@db.dovsdgqpanrgzeieqgmd.supabase.co:5432/postgres"

db.init_app(app)

# User table
class supabaseUser(db.Model):
     
    __table_name__ = 'supabase_user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    password = db.Column(db.String)
    
# Employee table
class Employee(db.Model):

    __table_name__ = 'employee'

    employee_id = db.Column(db.Integer, primary_key=True)
    employee_name = db.Column(db.String)
    age = db.Column(db.Integer)
    gender = db.Column(db.String)
    is_active = db.Column(db.String)
    aadhar_number = db.Column(db.String)
    mobile_number = db.Column(db.String)
    city = db.Column(db.String)

with app.app_context():
    db.create_all()
