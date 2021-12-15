from api.models.models import db, AverageTime


class CreateBox:

    def __init__(self, username, time):
        self.username = username
        self.time = time

    def create(self):

        with db.session.begin(subtransactions=True):
            new_box = AverageTime(0, self.time, self.username)
            db.session.add(new_box)
        db.session.commit()



class DeleteBox:

    def __init__(self, delete_key, username):
        self.delete_key = delete_key
        self.username = username

    def delete(self):
        if str(self.delete_key) == "undefiend":
            box_list = [i.avg_id for i in AverageTime.query.filter_by(record_id=self.username)]
            with db.session.begin(subtransactions=True):
                box = AverageTime.query.get(box_list[0])
                db.session.delete(box)
            db.session.commit()

        else:
            with db.session.begin(subtransactions=True):
                box = AverageTime.query.get(self.delete_key)
                db.session.delete(box)
            db.session.commit()
