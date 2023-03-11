from flask import Blueprint

gm_blueprint = Blueprint('gm_blueprint', __name__,url_prefix="/api/v1")

@gm_blueprint.route('/gms',methods=['GET'])
def index():
    return "This is an example app"
