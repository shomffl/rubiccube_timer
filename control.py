from re import sub
from flask import Flask, request
from api.models.models import db, User, Time, AverageTime
from app import app
from api.generate_scramble_code import generate_scramble_code
from api.check_in import CheckIn
from api.cd_box import CreateBox, DeleteBox
from datetime import datetime



@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        password = str(data["password"])

        register = CheckIn(username, password)
        return_data = register.register()

    return {"check_error" : return_data[0], "select_root" : return_data[1], "text": return_data[2]}

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        password = str(data["password"])

        login = CheckIn(username, password)
        return_data = login.login()


    return {"check_error" : return_data[0], "select_root" : return_data[1], "text": return_data[2]}


@app.route("/get_code")
def get_code():
    code = generate_scramble_code()

    return {"code": code}


@app.route("/get_box_list", methods=["POST"])
def get_box_list():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        box_list = [i.avg_id for i in AverageTime.query.filter_by(record_id=username)]

    return {"box_list": box_list}

@app.route("/create_box", methods=["POST"])
def make_box():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        time = datetime.now()

        box = CreateBox(username, time)
        box.create()

        box_list = [i.avg_id for i in AverageTime.query.filter_by(record_id=username)]

        return {"box_list": box_list}
    

@app.route("/delete_box", methods=["POST"])
def delete_box():
    if request.method == "POST":
        data = request.get_json()
        delete_key = data["deleteKey"]
        username = str(data["username"])

        box = DeleteBox(delete_key, username)
        box.delete()

        box_list = [i.avg_id for i in AverageTime.query.filter_by(record_id=username)]

        return {"box_list" : box_list}



@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(debug=True)
