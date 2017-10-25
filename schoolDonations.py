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
    return render_template("funding.html")

@app.route("/oregons-vs-average")
def comparison():
    return render_template("comparison.html")

@app.route("/students")
def reach():
    return render_template("reach.html")

@app.route("/future")
def future():
    return render_template("future.html")


@app.route("/donorsUS/projects")
def donor_projects():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=55000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)