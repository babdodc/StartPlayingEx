from extensions import db


#GM username
#Image (avatar) url
#Number of reviews
#The count of lookup requests made to your API for this username (the count should be 1 on the first request, 2 on the next request, etc.).

class gm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150))
    numReviews = db.Column(db.Integer)
    lookUpRequests = db.Column(db.Integer)
    def __repr__(self):
        return f'<GM "{self.username}">'
