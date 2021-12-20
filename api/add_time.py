from api.models.models import db, Time


class AddTime():

    def __init__(self, time, sc_code, avg_id):
        self.time = time
        self.sc_code = sc_code
        self.avg_id = avg_id

    def add(self):
        with db.session.begin(subtransactions=True):
            new_time = Time(self.time, self.sc_code, self.avg_id)
            db.session.add(new_time)
        db.session.commit()

    
