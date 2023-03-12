from flask import Flask
from blueprints.gm_blueprint import gm_blueprint
from blueprints.popularity_blueprint import popularity_blueprint
from config import Config
from extensions import db
from flask_migrate import Migrate
#TODO: Figure out a better way of importing models module for migrations
from models import gm
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
Migrate(app,db)

app.register_blueprint(gm_blueprint)
app.register_blueprint(popularity_blueprint)
