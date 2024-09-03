# encoding=gb2312
import pandas as pd
from chefboost import Chefboost as cb
from sklearn.preprocessing import OrdinalEncoder

if __name__ == '__main__':



    df = pd.read_excel("../../../原有数据挖掘系统测试数据.xls")
    feature_cols = df.columns.tolist()

    # split dataset in features and target variable

    enc = OrdinalEncoder()
    enc.fit(df.values.tolist())

    df = pd.DataFrame(enc.transform(df.values.tolist()), columns=feature_cols)
    df_test = df.iloc[2000:]
    df_train = df.iloc[:2000]

    config = {'algorithm': 'CARTs', 'enableParallelism': True}
    model = cb.fit(df_train, config, target_label='CrimeName')

    df_test = df_test.values.tolist()
    wrong = 0
    correct = 0
    total = len(df_test)
    label = len(df_test[0]) - 1
    for i, instance in enumerate(df_test):
        prediction = cb.predict(model, instance)
        if prediction == df_test[i][label]:
            correct += 1
        else:
            wrong += 1
    print(correct / total)




