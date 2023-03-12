from models.gm import gm
from extensions import db

#Get existing GM in the db if it exists
def getExistingGM(username):
    return gm.query.filter_by(username=username).first()
#Get list of existing gms by lookup count desc -> TODO: Pagination
def getAllGMs():
    return gm.query.order_by(gm.lookUpRequests.desc()).all()

#insert a gm into the db
def insertGM(model):
    try:
        generalManager = gm(id=model["id"], username=model["username"], image=model["image"], numReviews=model["numReviews"], lookUpRequests=1)
        db.session.add(generalManager)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
#update a gm
def updateGM(generalManager):
    try:
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        return False

