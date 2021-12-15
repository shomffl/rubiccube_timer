from flask import Flask, request
from api.models.models import db, User, Time, AverageTime
from app import app
from api.generate_scramble_code import generate_scramble_code
from api.check_in import CheckIn



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


@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(debug=True)
