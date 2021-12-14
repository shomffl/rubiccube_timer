from api.models.models import db, User

class Register:

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def check_data(self):
        check_error = False
        select_root = "/timer"
        text = ""

        try:
            with db.session.begin(subtransactions=True):
                new_member = User(self.username, self.password)
                db.session.add(new_member)
            db.session.commit()
            text = "you have successfully registered"
        except:
            text = "this username was already used"
            check_error = True
            select_root = "/"

        return(check_error, select_root, text)

class Login:

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def check_data(self):
        check_error = False
        select_root = "/timer"
        text = ""


        name_list = [i.name for i in User.query.all()]

        if self.username in name_list:
            for e in User.query.filter_by(name=self.username):
                register_password = e.password
                if self.password == register_password:
                    select_root = "/timer"
                    text = "The process was successful"
                else:
                    check_error = True
                    select_root = "/"
                    text = "password is not collect"
        else:
            text = "this user name is not registerd"
            check_error = True
            select_root = "/"

        return(check_error, select_root, text)
