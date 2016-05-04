#Decision Tree

from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import os

# prediction of grade for user as admin according to the algorithm selected
def adminGrades(input_data,algorithm):

    # open the csv file to extract data
    fn = os.path.join(os.path.dirname(__file__), 'TrainingData.csv')
    f = open(fn)
    data = np.loadtxt(f,delimiter=",")
    X = data[:, 0:12]
    Y = data[:, 12]

    # creation of predictive model according to the algorithm
    if algorithm == 'dec':
        model = DecisionTreeClassifier()
        model = model.fit(X,Y)
    elif algorithm == 'svc':
        model = SVC()
        model.fit(X, Y)
    elif algorithm == 'knn':
        # vale of k=5
        model = KNeighborsClassifier(n_neighbors=5)
        model.fit(X, Y)

    # test data
    test_data = [input_data]

    # pass the test data as input to the model
    predict = model.predict(test_data)

    # return the result
    return predict[0];

# function to calculate the precision or accuracy of the algorithm on the training data
def precision(algorithm):
    fn = os.path.join(os.path.dirname(__file__), 'TrainingData.csv')
    f = open(fn)
    data = np.loadtxt(f, delimiter=",")

    X = data[:, 0:12]
    Y = data[:, 12]

    if algorithm == 'dec':
        model = DecisionTreeClassifier()
        model = model.fit(X, Y)
    elif algorithm == 'svc':
        model = SVC()
        model.fit(X, Y)
    elif algorithm == 'knn':
        model = KNeighborsClassifier(n_neighbors=5)
        model.fit(X, Y)

    test = open(fn)
    test_data = np.loadtxt(test, delimiter=",")
    actual_value = test_data[:, 12]

    # taking test data same as the training data
    test_data = test_data[:, 0:12]

    test_data.shape

    predict = model.predict(test_data)
    correct_prediction = 0
    for x in range(len(predict)):
        if predict[x] == actual_value[x]:
            correct_prediction += 1
    accuracy = float(correct_prediction) / float(len(actual_value))

    # return the calculated value
    return accuracy