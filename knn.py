import csv
import random
import math
import operator
import os


# loading the data set
def loadDataset(filename, training_set=[]):
    with open(filename, 'rt', encoding='ISO-8859-1') as csvfile:
        lines = csv.reader(csvfile)
        dataset = list(lines)
        for x in range(len(dataset)):
            for y in range(12):
                dataset[x][y] = float(dataset[x][y])
            training_set.append(dataset[x])


# calculating the euclidean distance
def euclideanDistance(node1, node2, length):
    distance = 0
    for x in range(length):
        distance += pow((float(node1[x]) - float(node2[x])), 2)
    return math.sqrt(distance)


# getting the neighbors
def getNeighbors(training_set, test_set, k):
    distances = []
    length = len(test_set) - 1
    for x in range(len(training_set)):
        dist = euclideanDistance(test_set, training_set[x], length)
        distances.append((training_set[x], dist))
    distances.sort(key=operator.itemgetter(1))
    neighbors = []
    for x in range(k):
        neighbors.append(distances[x][0])
    return neighbors



# get responses
def getResponse(neighbors):
    responses = {}
    for x in range(len(neighbors)):
        response = neighbors[x][-1]
        if response in responses:
            responses[response] += 1
        else:
            responses[response] = 1
    sorted_responses = sorted(responses.items(), key=operator.itemgetter(1), reverse=True)
    return sorted_responses[0][0]



# main function
def main(in_data):
    # prepare data
    training_set = []

    # pass the input data as test data
    testing_set = [in_data]
    fn = os.path.join(os.path.dirname(__file__),'Trained.csv')
    # call load data set function
    loadDataset(fn, training_set)

    # generate predictions with k=3
    k = 3
    for x in range(len(testing_set)):
        # call getNeighbors function to get 3 nearest neighbour
        neighbors = getNeighbors(training_set, testing_set[x], k)
        # call getResponse method to get value of the neighbors
        result = getResponse(neighbors)
        # assign the value
        predictions = result
    # return computed value
    return predictions