from enum import unique
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import backref
from app import app

db = SQLAlchemy(app)
migrate = Migrate()
migrate.init_app(app, db)


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)
    total_avg_time = db.relationship("AverageTime", backref="users")

    def __init__(self, name, password):
        self.name = name
        self.password = password

class AverageTime(db.Model):

    __tablename__ = "average_times"

    avg_id = db.Column(db.Integer, primary_key=True)
    avg_time = db.Column(db.Float, nullable=False)
    create_at = db.Column(db.DateTime)
    record_id = db.Column(db.String(20), db.ForeignKey("users.name"))

    def __init__(self, avg_time, create_at, record_id):
        self.avg_time = avg_time
        self.create_at = create_at
        self.record_id = record_id

class Time(db.Model):

    __tablename__ = "times"

    time_id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Float, nullable=False)
    sc_code = db.Column(db.Text, nullable=False)
    avg_id = db.Column(db.String(20), db.ForeignKey("average_times.avg_id"))

    def __init__(self, time, sc_code, avg_id):
        self.time = time
        self.sc_code = sc_code
        self.avg_id = avg_id
