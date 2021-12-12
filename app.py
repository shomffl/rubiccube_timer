import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
base_dir = os.path.abspath(os.path.dirname(__name__))



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
