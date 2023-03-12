from extensions import db
import json

#GM username
#Image (avatar) url
#Number of reviews
#The count of lookup requests made to your API for this username (the count should be 1 on the first request, 2 on the next request, etc.).

class gm(db.Model):
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String(150))
    numReviews = db.Column(db.Integer)
    lookUpRequests = db.Column(db.Integer)
    image= db.Column(db.Text)
    def __repr__(self):
        return f'<GM "{self.username}">'
    #https://stackoverflow.com/questions/5022066/how-to-serialize-sqlalchemy-result-to-json
    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns if c.name != "id"}
