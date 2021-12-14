from flask import Flask, request
from api.models.models import db, User, Time, AverageTime
from app import app



@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        password = str(data["password"])
        print(username, password)
        check_error = False
        select_root = "/timer"

        try:
            with db.session.begin(subtransactions=True):
                new_member = User(username, password)
                db.session.add(new_member)
            db.session.commit()
        except:
            print("this username was alredy registerd")
            check_error = True
            select_root = "/"

    return {"check_error" : check_error, "select_root" : select_root}

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        password = str(data["password"])
        check_error = False
        select_root = "/timer"


        name_list = [i.name for i in User.query.all()]

        if username in name_list:
            for e in User.query.filter_by(name=username):
                register_password = e.password
                if password == register_password:
                    select_root = "/timer"
                else:
                    check_error = True
                    select_root = "/"
                    print("password is not collect")
        else:
            print("this user name is not registerd")
            check_error = True
            select_root = "/"

    return {"check_error" : check_error, "select_root" : select_root}

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(debug=True)
