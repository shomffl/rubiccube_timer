from api.models.models import db, User

class CheckIn:

    def __init__(self, username, password):
        self.username = username
        self.password = password

        self.check_error = False
        self.select_root = "/timer"
        self.text = ""

    def register(self):

        try:
            with db.session.begin(subtransactions=True):
                new_member = User(self.username, self.password)
                db.session.add(new_member)
            db.session.commit()
            self.text = "you have successfully registered"
        except:
            self.text = "this username was already used"
            self.check_error = True
            self.select_root = "/"

        return(self.check_error, self.select_root, self.text)

    def login(self):

        name_list = [i.name for i in User.query.all()]

        if self.username in name_list:
            for e in User.query.filter_by(name=self.username):
                register_password = e.password
                if self.password == register_password:
                    self.select_root = "/timer"
                    self.text = "The process was successful"
                else:
                    self.check_error = True
                    self.select_root = "/"
                    self.text = "password is not collect"
        else:
            self.text = "this user name is not registerd"
            self.check_error = True
            self.select_root = "/"

        return(self.check_error, self.select_root, self.text)
