from flask import Blueprint
from flask import jsonify, request
import os
from Algorithms.decision_tree import *

decisionTree = Blueprint('decisionTree', __name__)

decisionTrees = {}


@decisionTree.route('/decisionTree/algorithms', methods=['GET'])
def decision_tree_algorithms():


    data = [{
        'value': 'CART',
        'label': 'CART'
    }, {
        'value': 'ID3',
        'label': 'ID3'
    }
    ]
    return {
        'data': data
    }


def change_decision_tree_format(data):

    results = []
    for (key, value) in data.items():
        if isinstance(value, str):
            res = {'label': key + '  ——>  ' + value}
        else:
            res = {'label': key, 'children': change_decision_tree_format(value)}
        results.append(res)
    return results


@decisionTree.route('/decisionTree/decisionTreeAnalysis', methods=['POST'])
def decision_tree_analysis():

    file = request.files.get('file')
    algorithm = request.form.get('algorithm')
    token = request.form.get('token')
    file_path = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(file_path, file.filename)
    file.save(file_path)
    resultDict = {}
    if algorithm == 'CART':
        labels, trainingData = loadXLS(file_path)  # demo data from matlab
        decisionTree = growDecisionTreeFrom(trainingData)
        CART_prune(decisionTree, 0.8, notify=False)  # notify, when a branch is pruned (one time in this example)
        resultDict = CART_plot(decisionTree)
        decisionTrees[token] = {
            'tree': decisionTree,
            'test_function': CART_test,
            'args': None
        }

    elif algorithm == 'ID3':
        dataSet, labels = createDataSet(file_path)
        resultDict = createTree(dataSet)

        decisionTrees[token] = {
            'tree': resultDict,
            'test_function': ID3_test,
            'args': {
                'labels': labels
            }
        }
    data_ = resultDict
    data = change_decision_tree_format(data_)

    return {'data': data}


@decisionTree.route('/decisionTree/test', methods=['POST'])
def decision_tree_test():
    token = request.form.get('token')
    file = request.files.get('file')
    file_path = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(file_path, file.filename)
    file.save(file_path)
    print(token)
    print(decisionTrees)
    data = []
    if token in decisionTrees.keys():
        data = decisionTrees[token]['test_function'](file_path, decisionTrees[token]['tree'], decisionTrees[token]['args'])

    return {
        'data': data
    }
