import os
import csv

# function to get the names of the universities from the complete training data set
def names():
    uniNames=[]
    fn = os.path.join(os.path.dirname(__file__), 'FullTraining.csv')
    with open(fn, 'rt', encoding='ISO-8859-1') as csvfile:
        lines = csv.reader(csvfile)
        dataset = list(lines)
        for x in range(len(dataset)):
            uniNames.append({"uni_id": dataset[x][0],"uni_name":dataset[x][2].strip(),"uni_grade":dataset[x][13].strip(),"details":dataset[x][14:26]})
        return uniNames
