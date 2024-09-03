from flask import Flask
from flask_cors import CORS
from Services.user import user
from Services.data_reduction import dataReduction
from Services.rule_extraction import ruleExtraction
from Services.decision_tree import decisionTree


app = Flask(__name__)
app.register_blueprint(user)
app.register_blueprint(dataReduction)
app.register_blueprint(ruleExtraction)
app.register_blueprint(decisionTree)

CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5051)  # host="0.0.0.0"

