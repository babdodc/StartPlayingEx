from flask import Blueprint,jsonify
from operations.queries import getAllGMs

popularity_blueprint = Blueprint('popularity_blueprint', __name__,url_prefix="/api/v1")

@popularity_blueprint.route('/popularity',methods=['GET'])
def index():
    result = getAllGMs()
    return jsonify([x.as_dict() for x in result])

