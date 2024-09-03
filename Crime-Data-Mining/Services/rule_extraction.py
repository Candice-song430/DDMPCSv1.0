from flask import Blueprint
from flask import jsonify, request
from Algorithms.rule_extraction.RulesAlgorithm import *
from Algorithms.data_preprocess import RegularData
import os

ruleExtraction = Blueprint('ruleExtraction', __name__)


@ruleExtraction.route('/ruleExtraction/algorithms', methods=['GET'])
def rule_extraction_algorithms():


    #  data的变量名可以修改，但是内部结构不要修改
    data = [{
        'value': 'Rule extraction algorithm based on difference matrix',
        'label': 'Rule extraction algorithm based on difference matrix'
    }, {
        'value': 'Rule extraction algorithm based on attribute deletion',
        'label': 'Rule extraction algorithm based on attribute deletion'
    }]

    return {
        'data': data
    }


def build_header_and_data(header, data_):

    res = []
    for i in range(0, len(data_)):
        data = {}
        for j in range(0, len(header)):
            data[header[j]] = data_[i][j]
        res.append(data)
    return res


@ruleExtraction.route('/ruleExtraction/ruleExtractionProcessing', methods=['POST'])
def rule_extraction_processing():

    file = request.files.get('file')
    print(file)
    algorithm = request.form.get('algorithm')

    file_path = os.path.abspath(os.path.dirname(__file__))
    file.save(os.path.join(file_path, file.filename))

    data = RegularData(os.path.join(file_path, file.filename))

    if algorithm == "Rule extraction algorithm based on difference matrix":
        RA = RulesAlgorithm1(data)
    elif algorithm == "Rule extraction algorithm based on attribute deletion":
        RA = RulesAlgorithm2(data)
    RA.run()

    rulesInfo = RA.getResInfo()
    ifThenRulesHeader = ['Rule', 'Class', 'Support', 'Confidence']
    ifThenRulesData_ = RA.getIfThenRes()
    ifThenRulesData = build_header_and_data(ifThenRulesHeader, ifThenRulesData_)
    ifThenRules = {'header': ifThenRulesHeader,
                   'data': ifThenRulesData}

    tableFormatHeader = ['Incident time', 'Incident location', 'Suspect age', 'Gender', 'Place of origin', 'Education level', 'Employment status', 'Resident status', 'Case category']
    tableFormatData_ = RA.getTableRes()
    tableFormatData = build_header_and_data(tableFormatHeader, tableFormatData_)
    tableFormat = {
        'header': tableFormatHeader,
        'data': tableFormatData}

    matrix_ = RA.getConfusionMatrix()
    confusionMatrixHeader = []
    for i in range(len(matrix_)):
        confusionMatrixHeader.append(matrix_[i][0])
    matrix = build_header_and_data(confusionMatrixHeader, matrix_)
    confusionMatrix = {
        'header': confusionMatrixHeader,
        'matrix': matrix
    }

    data = {'rulesInfo': rulesInfo,
            'ifThenRules': ifThenRules,
            'tableFormat': tableFormat,
            'confusionMatrix': confusionMatrix}
    res = {'data': data}

    return res
