import xlrd
import xlwt
import json

class RegularData:

    def __init__(self, src):

        # 从xml中读取数据
        data = []
        wb = xlrd.open_workbook(src)
        table = wb.sheets()[0]
        row = table.nrows
        for i in range(row):
            data.append(table.row_values(i))

        self.myBasePath = ""
        self.NameOfAlgorithm = ""
        self.NameOfDataFile = ""

        self.myOriginalData = data
        self.iRows = len(data)
        self.jColumns = len(data[0])

        self.myReducedAttributes = []
        self.myRules = [[]]
        self.num_of_rules = 0

        self.myReduct_A_1_choice = 0
        self.myReduct_A_2_choice = 0
        self.myRule_A_1_choice = 0
        self.myRule_A_2_choice = 0

        self.myRegularData = [[]]
        self.attributes_map = [[]]

        self.myAttributes_Distribution_Simple = [[]]
        self.myAttributes_Distribution_Detail = [[]]

        self.myTestData = [[]]
        self.TD_iRows = 0
        self.TD_jColumns = 0

        self.regularizeData()
        

    def preprocess(self):

        data = self.myOriginalData


        a = 0
        col = len(data[0])
        for i in range(col-1):
            if data[0][i] == "ajlb":
                a = i
        if a != 0:
            for i in range(len(data)):
                tmp = data[i][a]
                data[i][a] = data[i][col-1]
                data[i][col-1] = tmp

        self.header_ch = []
        self.header_en = []
        header = open("headers.json", mode="r", encoding="utf-8")
        dic = json.load(header)
        for i in range(col):
            self.header_ch.append(dic[data[0][i]])
            self.header_en.append(data[0][i])

        for i in range(col):
            if data[0][i] == "age" or data[0][i] == "nl":
                self.regularizeAge(i)


    def regularizeAge(self, col):
        for i in range(1,self.iRows):
            age = int(int(self.myOriginalData[i][col])/10)*10
            self.myOriginalData[i][col] = str(age+1)+"-"+str(age+10)

    def regularizeData(self):

        count = 0
        row = self.iRows
        col = self.jColumns
        myTemp = [0] * row

        self.myRegularData = [[None] * col for _ in range(row + 1)]
        self.myAttributes_Distribution_Simple = [[] for _ in range(col)]
        self.attributes_map = [[] for _ in range(col)]

        for j in range(col):
            self.myRegularData[1][j] = 0

        for j in range(col):
            count = 1
            myTemp[0] += 1

            for i in range(2, row):
                flag = False
                for k in range(1, i):
                    if self.myOriginalData[i][j] == self.myOriginalData[k][j]:
                        self.myRegularData[i][j] = self.myRegularData[k][j]
                        myTemp[self.myRegularData[k][j]] += 1
                        flag = True
                        break
                if flag is False:
                    self.myRegularData[i][j] = count
                    myTemp[count] += 1
                    count += 1

            self.myAttributes_Distribution_Simple[j] = [0] * count
            self.attributes_map[j] = [None] * count

            for k in range(count):
                self.myAttributes_Distribution_Simple[j][k] = myTemp[k]
                myTemp[k] = 0

        count = len(self.myAttributes_Distribution_Simple[col - 1])
        self.myAttributes_Distribution_Detail = [[[]] * col] * count

        for j in range(col - 1):
            lenth = len(self.myAttributes_Distribution_Simple[j])
            for i in range(count):
                self.myAttributes_Distribution_Detail[i][j] = [None] * lenth

        for j in range(col):
            for i in range(1, row):
                if self.attributes_map[j][self.myRegularData[i][j]] is None:
                    self.attributes_map[j][
                        self.myRegularData[i][j]
                    ] = self.myOriginalData[i][j]


    def saveXml(self, filepath):
        workbook = xlwt.Workbook(encoding='utf-8')
        sheet = workbook.add_sheet('Sheet1')
        for j in range(self.jColumns):
            sheet.write(0, j, self.header_ch[j])
        for i in range(1, self.iRows):
            for j in range(self.jColumns):
                sheet.write(i, j, self.myOriginalData[i][j])
        workbook.save(filepath)
