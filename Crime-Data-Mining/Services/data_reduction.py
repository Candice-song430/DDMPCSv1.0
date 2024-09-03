from flask import send_from_directory, Blueprint
from flask import jsonify, request
import json
from Algorithms.data_preprocess import RegularData
from Algorithms.data_reduction.ReductsAlgorithm import *

import os
dataReduction = Blueprint('dataReduction', __name__)


@dataReduction.route('/dataReduction/dataPreprocessing', methods=['POST'])
def data_preprocessing():

    file = request.files.get('file')
    token = request.form.get('token')
    file_path = os.path.abspath(os.path.dirname(__file__))
    file.save(os.path.join(file_path, file.filename))


    new_filename = "preprocess" + token + ".xls"
    data = RegularData(os.path.join(file_path, file.filename))
    data.preprocess()
    data.saveXml(os.path.join(file_path, new_filename))
    return send_from_directory(file_path, new_filename, as_attachment=True)


@dataReduction.route('/dataReduction/dataReductionProcessing', methods=['POST'])
def data_reduction_processing():

    file = request.files.get('file')
    algorithm = request.form.get('algorithm')
    token = request.form.get('token')
    file_path = os.path.abspath(os.path.dirname(__file__))
    file.save(os.path.join(file_path, file.filename))

    # TODO
    data1 = RegularData(os.path.join(file_path, file.filename))
    RA = None
    if algorithm == "Reduction algorithm based on difference matrix":
        RA = ReductsAlgorithm1(data1)
    elif algorithm == "Attribute reduction algorithm based on attribute deletion":
        RA = ReductsAlgorithm2(data1)
    RA.run()
    new_filename = 'data_reduction' + token + '.xls'
    res = RA.GettableHeader(os.path.join(file_path, new_filename))
    data = {'tableHeader': res}

    rv = send_from_directory(file_path, new_filename, as_attachment=True)
    rv.headers['attached-info'] = json.dumps(data)
    rv.headers['Access-Control-Expose-Headers'] = 'Attached-Info'
    return rv


@dataReduction.route('/dataReduction/algorithms', methods=['GET'])
def data_reduction_algorithms():

    data = [{
        'value': 'Reduction algorithm based on difference matrix',
        'label': 'Reduction algorithm based on difference matrix'
    }, {
        'value': 'Attribute reduction algorithm based on attribute deletion',
        'label': 'Attribute reduction algorithm based on attribute deletion'
    }]
    return {
        'data': data
    }
