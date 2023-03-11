from flask import Blueprint
from flask_restplus import Api

swagger_blueprint = Blueprint('swagger_blueprint', __name__, url_prefix="/api/v1/docs")

swagger_api = Api(swagger_blueprint)

