import pandas as pd
import math
import operator

global depth
depth = 0


def Entropy(data):
    length = len(data)
    result = 0
    for item in set(data):
        e = -(data.count(item) / length * math.log10(data.count(item) / length))
        result = result + e
    return result


def createDataSet(src):
    dataSet = pd.read_excel(src)
    return dataSet, list(dataSet)


def calculateEntropy(dataSet):
    dataItems = len(dataSet)
    allLable = dataSet.iloc[:, -1].values.tolist()
    LableKinds = set(allLable)
    Entropy = 0
    for item in LableKinds:
        e = -(allLable.count(item)/dataItems*math.log10(allLable.count(item)/dataItems))
        Entropy = Entropy + e
    return Entropy


def splitDataSet(dataSet,feature,value):
    newDataSete = dataSet.loc[dataSet.loc[:,feature].values == value,:]
    newDataSete = newDataSete.drop(columns=feature)
    return newDataSete


def chooseBestFeatureTosplit(dataSet):
    rawEntropy = calculateEntropy(dataSet)
    # feature
    allFeature = dataSet.columns.values[0:-1]
    if len(allFeature) == 0:
        print("warnings: allFeature=0")
    for feature in allFeature:
        allKinds = set(dataSet.loc[:,feature].values.tolist())
        bestFeature = feature
        rawinformationGain = 0
        singelFeatureEntroy = 0
        for value in allKinds:
            newdataSet = splitDataSet(dataSet,feature,value)
            # Entropy
            ratio = len(newdataSet)/float(len(dataSet))
            En = ratio*calculateEntropy(newdataSet)
            singelFeatureEntroy +=  En
        informationGain = rawEntropy - singelFeatureEntroy
        if informationGain > rawinformationGain:
            bestFeature = feature
            rawinformationGain = informationGain
    return bestFeature


def moremajorityVote(classList):
    classCount = {}
    for item in classList:
        if item not in classCount.keys():
            classCount[item] = 1
        else:
            classCount[item] += 1
    sortedClassCount = sorted(classCount.items(),key = operator.itemgetter(1),reverse=True)
    return sortedClassCount[0][0]


def createTree(dataSet):
    targets = dataSet.iloc[:, -1].values.tolist()
    if targets.count(targets[0]) == len(targets):
        return targets[0]
    if dataSet.shape[1] == 1:
        return moremajorityVote(dataSet.iloc[:, 0].values.tolist())



    BestFeatures = chooseBestFeatureTosplit(dataSet)
    myTree = {BestFeatures: {}}
    featureValuesKind = set(dataSet.loc[:, BestFeatures].values.tolist())
    for value in featureValuesKind:
        # print(value)
        myTree[BestFeatures][value] = createTree(splitDataSet(dataSet, BestFeatures, value))
    return myTree


def show_tree(data):
    for ks, vs in data.items():
        global depth
        for i in range(depth):
            print("\t", end="")
        # print(x)
        depth += 1
        if isinstance(vs, dict):
            print(ks)
            show_tree(vs)
        else:
            print(ks, end=":")
            print(vs)
        depth -= 1


def test_tree(dtree, labels, tdata):
    result = None
    for k, v in dtree.items():
        loc = labels.index(k)
        t = tdata[loc]

        if t not in v:
            return None

        temp = v[t]
        if not isinstance(temp, dict):
            # print(temp)
            return temp
        result = test_tree(temp, labels, tdata)
    return result


def ID3_test(src, dtree, args):
    labels = args['labels']
    testDataSet = pd.read_excel(src)
    totalNum = len(testDataSet)
    correctNum = 0
    wrongNum = 0
    actual_results = testDataSet.iloc[:, -1].values.tolist()
    test_data = testDataSet.iloc[:, ].values.tolist()
    for td in test_data:
        td.pop()
    index = 0
    for td in test_data:
        predict_result = test_tree(dtree, labels, td)
        if predict_result == actual_results[index]:
            correctNum += 1
        else:
            wrongNum += 1
        index += 1

    data = [
        'Number of test cases: ' + str(totalNum),
        'Number of correct examples: ' + str(correctNum),
        'Number of incorrect examples: ' + str(wrongNum),
        'Accuracy: ' + str('{:.2%}'.format(correctNum / totalNum))
    ]
    return data


# if __name__ == '__main__':
#     dataSet, labels = createDataSet()
#     myTree = createTree(dataSet)
#     # print(myTree)
#     show_tree(myTree)
#     test_result = ID3_test(myTree, labels)
#     print(test_result)


