# encoding=utf-8
import numpy as np
import xlrd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
# load data

dataset = []
wb = xlrd.open_workbook('../../../原有数据挖掘系统测试数据.xls')
table = wb.sheets()[0]
row = table.nrows
for i in range(row):
    dataset.append(table.row_values(i))
dataset.pop(0)

from sklearn.preprocessing import OrdinalEncoder

enc = OrdinalEncoder()
enc.fit(dataset)
dataset = enc.transform(dataset)

dataset = np.array(dataset, dtype=object)
label_index = len(dataset[0]) - 1
print(label_index)
# split data into X and y
X = dataset[:, 0:label_index]
Y = dataset[:, label_index]
# split data into train and test sets
seed = 7
test_size = 0.3
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=test_size, shuffle=False)

xg_train = xgb.DMatrix(X_train, label=y_train)
xg_test = xgb.DMatrix(X_test, label=y_test)

param = {}
# use softmax multi-class classification
param['objective'] = 'multi:softmax'
# scale weight of positive examples
param['eta'] = 0.5
param['max_depth'] = 6
param['nthread'] = 4
param['num_class'] = 8

watchlist = [(xg_train, 'train'), (xg_test, 'test')]
num_round = 5
bst = xgb.train(param, xg_train, num_round, watchlist)
# get prediction
pred = bst.predict(xg_test)
error_rate = np.sum(pred != y_test) / y_test.shape[0]
print('Test error using softmax = {}'.format(error_rate))

# do the same thing again, but output probabilities
param['objective'] = 'multi:softprob'
bst = xgb.train(param, xg_train, num_round, watchlist)
# Note: this convention has been changed since xgboost-unity
# get prediction, this is in 1D array, need reshape to (ndata, nclass)
pred_prob = bst.predict(xg_test).reshape(y_test.shape[0], 8)
pred_label = np.argmax(pred_prob, axis=1)
print(len(pred_label) == xg_test.num_row())
error_rate = np.sum(pred_label != y_test) / y_test.shape[0]
print('Test error using softprob = {}'.format(error_rate))