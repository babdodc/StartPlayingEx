from flask import Blueprint, request, Response,jsonify
from operations.dataFetch import getExternalGm
from operations.queries import *
gm_blueprint = Blueprint('gm_blueprint', __name__,url_prefix="/api/v1")

@gm_blueprint.route('/gms',methods=['GET'])
def index():
    #get required query params
        #username
        #optional - pagenumber
    username = request.args.get("username")

    if (username is None): return Response("username is a required queryparameter", status=400)

    page=request.args.get("page",default=0)
    gmData = None
    #check if exist in db -> probably could add a try catch here as well
    existingGM = getExistingGM(username=username)
    if (existingGM):
        #update record && update count
        existingGM.lookUpRequests = existingGM.lookUpRequests+1
        gmData = existingGM.as_dict()
        result = updateGM(existingGM)
        if (not result): return Response("Failed to update gm in db", status=500)

    else:
        #if not, fetch from external source
        externalGM = getExternalGm(username=username,page=page)
        if (externalGM["error"] is not None):return Response(externalGM["error"], status=500)
        gmData = externalGM["data"]
        #insert record
        result = insertGM(gmData)
        #remove id from response -> will need to discuss with team later if we want this in the resp or not
        gmData.pop("id")

        if (not result): return Response("Failed to insert gm to db", status=500)
        
    
    #return record
    return jsonify(gmData)
