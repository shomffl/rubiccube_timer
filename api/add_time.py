from api.models.models import db, Time, AverageTime


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

class UpdateTime():

    def __init__(self, avg_id):
        self.avg_id = avg_id

    def update(self):
        with db.session.begin(subtransactions=True):
            time_list = [i.time for i in Time.query.filter_by(avg_id=self.avg_id)]

            cul = round(sum(time_list) / len(time_list), 3)

            new_avg_time = AverageTime.query.get(self.avg_id)
            new_avg_time.avg_time = cul
        db.session.commit()
