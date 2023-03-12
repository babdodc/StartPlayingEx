import requests
import json 

#Get Gm from external api by username and page number
def getExternalGm(username,page):
    res = requests.get(f'https://startplaying.games/api/detect-magic/gms?page={page}&username={username}')
    responseModel = {
        "data": None,
        "error": None
    }
 
    if (res.ok):
        data = json.loads(res.text)
        if (len(data["gms"]) > 0):
            response = data["gms"][0]

            responseModel["data"]= dict(id=response["id"],username=response["username"],image=response["image"],numReviews=response["gmProfile"]["gmStats"]["numReviews"],lookUpRequests=1)
        else:
            #TODO: Support Better Error Http response codes / Better error models
            responseModel.update({"error": "Unable to find GM"})
    else:
        responseModel.update({"error":  res.text})

    return responseModel
