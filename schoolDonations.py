from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

# Local URI mongodb://localhost:27017
# Local db name donorsUSA

# prod URI mongodb://root:Football2012@ds235785.mlab.com:35785/heroku_lxbrsr0m
# prod heroku_lxbrsr0m


MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://root:Football2012@ds235785.mlab.com:35785/heroku_lxbrsr0m')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'heroku_lxbrsr0m')
COLLECTION_NAME = 'projects'
FIELDS = {'funding_status': True, 'school_state': True, 'resource_type': True, 'poverty_level': True,
          'date_posted': True, 'total_donations': True, 'grade_level': True, 'students_reached':True, '_id': False}


@app.route("/")
def home():
    return render_template("home.html")

@app.route("/funding")
def funding():
    return render_template("funding.html", url_name='funding')

@app.route("/oregons-vs-average")
def comparison():
    return render_template("comparison.html", url_name='comparison')

@app.route("/students")
def reach():
    return render_template("reach.html", url_name='reach')

@app.route("/future")
def future():
    return render_template("future.html", url_name='future')


@app.route("/donorsUS/ny_projects")
def ny_projects():
    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find({'school_state': 'NY'}, projection=FIELDS)
        return json.dumps(list(projects))

@app.route("/donorsUS/or_projects")
def or_projects():
    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find({'school_state': 'OR'}, projection=FIELDS)
        return json.dumps(list(projects))

@app.route("/donorsUS/projects")
def donor_projects():
    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS)
        return json.dumps(list(projects))



if __name__ == "__main__":
    app.run(debug=True)