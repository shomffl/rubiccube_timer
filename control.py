from flask import Flask, request
from api.models.models import db, User, Time, AverageTime
from app import app



@app.route("/register", methods=["POST"])
def login():
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
            print("catch error")
            check_error = True


    return {"check_error" : check_error}


if __name__ == "__main__":
    app.run(debug=True)
