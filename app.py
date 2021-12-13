import os
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__, static_folder="./frontend/build/", static_url_path="")
CORS(app)
base_dir = os.path.abspath(os.path.dirname(__name__))



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
