from flask import Blueprint

popularity_blueprint = Blueprint('popularity_blueprint', __name__,url_prefix="/api/v1")

@popularity_blueprint.route('/popularity',methods=['GET'])
def index():
    return "This is an example app"
