from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = '127.0.0.1'
MONGODB_PORT = 27017
DBS_NAME = 'donorsUSA'
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
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find({'school_state': 'NY'}, projection=FIELDS, limit=100000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects

@app.route("/donorsUS/or_projects")
def or_projects():
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find({'school_state': 'OR'}, projection=FIELDS, limit=55000)
        return json.dumps(list(projects))

@app.route("/donorsUS/projects")
def donor_projects():
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS, limit=55000)
        return json.dumps(list(projects))



if __name__ == "__main__":
    app.run(debug=True)