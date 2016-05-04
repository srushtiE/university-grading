import json,math


from flask import Flask, render_template, request
from sklearn import tree
from knn import main
from uniData import names
from adminDet import adminGrades,precision

# Initialize the Flask application
app = Flask(__name__)


# Render the landing page for log in
@app.route('/')
def login():
    return render_template('landingPage.html')


# Render the index page
@app.route('/getIndex')
def form():
    return render_template('index.html')


# Render the admin page
@app.route('/getAdmin')
def admin():
    return render_template('admin.html')


# Render the result page
@app.route('/getResult')
def result():
    return render_template('result.html')


# Route to predict grade
@app.route('/calcGrade', methods=['POST'])
def hello():
    in_data = request.json['details']
    predictions = main(in_data)
    return predictions


# Route to get the names of the universities
@app.route('/getNames', methods=['GET'])
def uniNames():
    uniDet = []
    uniDet = names()
    return json.dumps(uniDet)


# Route to predict grade based on the algorithm
@app.route('/getAdminGrade', methods=['POST'])
def getAdminGrades():
    in_data = request.json['details']
    algorithm = request.json['algo']
    grade = str(int(adminGrades(in_data,algorithm)))
    return grade


# Route to get the accuracy or precision of the algorithm through the data
@app.route('/getPrecision', methods=['POST'])
def getAlgoPrecision():
    algorithm = request.json['data']
    prec = str(precision(algorithm)*100)
    return prec


# Run the app
if __name__ == '__main__':
    print ("***************server called***************")
    app.run(
        host="0.0.0.0",
        port=int("5000"),
        debug=True,
        use_reloader = False
    )
