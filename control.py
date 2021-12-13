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

        try:
            with db.session.begin(subtransactions=True):
                new_member = User(username, password)
                db.session.add(new_member)
            db.session.commit()
        except:
            print("this username was alredy registerd")
            check_error = True

    return {"check_error" : check_error}

@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        username = str(data["username"])
        password = str(data["password"])
        check_error = False

        name_list = [i.name for i in User.query.all()]

        if username in name_list:
            for e in User.query.filter_by(name=username):
                register_password = e.password
                if password == register_password:
                    pass
                else:
                    check_error = True
                    print("password is not collect")
        else:
            print("this user name is not registerd")
            check_error = True

    return {"check_error": check_error}



if __name__ == "__main__":
    app.run(debug=True)
