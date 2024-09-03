# Load libraries
from sklearn.tree import DecisionTreeClassifier  # Import Decision Tree Classifier
from sklearn.model_selection import train_test_split  # Import train_test_split function
from sklearn import metrics  # Import scikit-learn metrics module for accuracy calculation
import pandas as pd

if __name__ == '__main__':
    df = pd.read_excel("../../../原有数据挖掘系统测试数据.xls")
    # dftest = df.iloc[2000:]
    # dftrain = df.iloc[:2000]
    # split dataset in features and target variable
    from sklearn.preprocessing import OrdinalEncoder

    enc = OrdinalEncoder()
    enc.fit(df.values.tolist())
    df_list = df.values.tolist()
    feature_cols = df.columns.tolist()

    df = pd.DataFrame(enc.transform(df_list), columns=feature_cols)

    labels = feature_cols[len(feature_cols) - 1]
    feature_cols = feature_cols[:-1]

    X = df[feature_cols]  # Features
    y = df[labels]  # Target variable
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,
                                                        shuffle=False)  # 70% training and 30% test


    # Create Decision Tree classifer object
    clf = DecisionTreeClassifier()

    # Train Decision Tree Classifer
    clf = clf.fit(X_train, y_train)

    # Predict the response for test dataset
    y_pred = clf.predict(X_test)
    print("Accuracy:", metrics.accuracy_score(y_test, y_pred))
