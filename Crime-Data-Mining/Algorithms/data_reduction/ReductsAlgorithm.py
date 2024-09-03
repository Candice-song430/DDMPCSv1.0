import xlwt

class ReductsAlgorithm:
    '''
        ReductsAlgorithm
    '''

    def __init__(self, inputData):
        self.attributes = []
        self.myDiscernibilityMatrix = []
        self.inputData = inputData
        self.rows = inputData.iRows
        self.columns = inputData.jColumns
        self.myReducedAttributes = []  # 存放属性约简
        self.myData = []
        self.myRules = []
        self.rules_count = 0
        self.Pos = []
        self.outputData = []
        self.myReducedAttributes = [False] * self.columns

    def Delete_Repetition(self):
        '''
            Delete_Repetition
        '''
        col_count, row_count = 0, 0
        position = 0
        temp = [False] * self.rows
        inputData = self.inputData
        temp[1] = True
        row_count = row_count + 1

        for i in range(2, self.rows):
            k = 1
            while k < i:
                if temp[k] is True:
                    col_count = 0
                    for j in range(0, self.columns):
                        if (
                                inputData.myRegularData[i][j]
                                == inputData.myRegularData[k][j]
                        ):
                            col_count = col_count + 1
                        else:
                            break
                    if col_count == self.columns:
                        temp[i] = False
                        break
                k += 1
            if k == i:
                temp[i] = True
                row_count = row_count + 1

        self.myData = [[0] * self.columns for _ in range(row_count)]
        self.outputData = [[None] * self.columns for _ in range(row_count)]
        position = 0

        for i in range(1, self.rows):

            if temp[i] is True:
                for j in range(0, self.columns):
                    self.myData[position][j] = inputData.myRegularData[i][j]
                    self.outputData[position][j] = inputData.myOriginalData[i][j]
                position = position + 1

        self.rows = row_count

    def GettableHeader(self, file_path):
        temp = []
        res=[]
        length = len(self.myReducedAttributes)
        for j in range(length):
            if self.myReducedAttributes[j] is True:
                temp.append(j)
                res.append(self.inputData.myOriginalData[0][j])
                # res.append((self.inputData.attributes_map[j][0]))
        # print(self.outputData)
        out = [[None] * len(temp) for _ in range(self.rows)]
        for i in range(self.rows):
            for j in range(len(temp)):
                out[i][j] = self.outputData[i][temp[j]]

        workbook = xlwt.Workbook(encoding='utf-8')
        sheet = workbook.add_sheet('Rule reduction')

        for col, column in enumerate(res):
            sheet.write(0, col, column)

        for row, data in enumerate(out):
            for col, column_data in enumerate(data):
                sheet.write(row + 1, col, column_data)

        workbook.save(file_path)
        return res


class ReductsAlgorithm1(ReductsAlgorithm):

    def run(self):
        self.Delete_Repetition()
        self.Generate_DiscernibilityMatrix()
        self.Generate_Reduct()


    def Generate_DiscernibilityMatrix(self):
        count = 0
        DM_count = 0
        row = self.rows
        col = self.columns
        position = 0

        myData = self.myData
        self.myDiscernibilityMatrix = [[0] * self.columns for _ in range(int(self.rows*(self.rows-1)/2))]
        self.attributes = [0] * col


        for i in range(2, self.rows):
            for k in range(1, i):

                if myData[i][self.columns - 1] != myData[k][self.columns - 1]:
                    count = 0
                    position = 0

                    for j in range(0, self.columns - 1):

                        if myData[i][j] != myData[k][j]:
                            self.myDiscernibilityMatrix[DM_count][j] = 1
                            position = j
                            if self.attributes[j] != -1 :
                                self.attributes[j] += 1
                            count = count + 1

                    if count == 1:
                        self.attributes[position] = -1

                    if count > 1:
                        self.myDiscernibilityMatrix[DM_count][self.columns - 1] = count
                        DM_count += 1

        self.attributes[self.columns - 1] = DM_count


    def Max_Attribute(self):

        attributes=self.attributes

        max_attr = 0
        for j in range(self.columns -1):
            if attributes[j] <0:
                max_attr = j
                attributes[max_attr] = 0
                self.myReducedAttributes[max_attr] = True
                return j

            else:
                if attributes[j] > attributes[max_attr]:
                    max_attr = j

        attributes[max_attr] = 0
        self.myReducedAttributes[max_attr] = True
        return max_attr

    def Generate_Reduct(self):


        position  = int (self.rows * (self.rows - 1) / 2)
        DM_count = self.attributes[self.columns - 1]
        Pos = self.Pos
        temp_rule = [False] * self.columns
        myData = self.myData
        #self.myReducedAttributes = [False] * self.columns

        while DM_count != 0:
            max_attr = self.Max_Attribute()
            for i in range(position):
                if self.myDiscernibilityMatrix[i][max_attr] == 1:
                    for j in range(self.columns):
                        self.myDiscernibilityMatrix[i][j] = 0
                    DM_count -= 1

        self.myReducedAttributes[self.columns-1] = True

class ReductsAlgorithm2(ReductsAlgorithm):

    def run(self):
        self.Delete_Repetition()
        self.Generate_POS()
        self.Generate_Deduct2()


    def Generate_POS(self):

        count = 0
        row = self.rows
        col = self.columns
        self.Pos = [True] * self.rows
        Pos = self.Pos
        myData = self.myData

        for i in range(2, row):
            for k in range(1, i):
                if myData[i][col - 1] != myData[k][col - 1]:
                    count = 0
                    for j in range(col - 1):
                        if myData[i][j] == myData[k][j]:
                            count = count + 1
                        else:
                            break

                    if count == col - 1:
                        Pos[i] = False
                        Pos[k] = False
                    else:
                        Pos[i] = Pos[i] & True
                        Pos[k] = Pos[k] & True

    def Generate_Deduct2(self):

        temp_col_count = self.columns-2
        count = 0

        rows = self.rows
        columns = self.columns
        temp_rule = [True] * columns
        self.myReducedAttributes = [True] * self.columns
        myData = self.myData
        Pos = self.Pos

        for j_1 in range(self.columns-1):
            self.myReducedAttributes[j_1] = False
            for i in range(2,self.rows):
                for k in range(1,i):
                    if self.myData[i][self.columns-1]!=self.myData[k][self.columns-1]:
                        count = 0
                        for j_2 in range(self.columns-1):
                            if self.myReducedAttributes[j_2] and self.myData[i][j_2] == self.myData[k][j_2]:
                                count += 1
                        if (self.Pos[i] or self.Pos[k]) and count == temp_col_count:
                            self.myReducedAttributes[j_1] = True
                            break
                if self.myReducedAttributes[j_1] is True:
                    break
            if self.myReducedAttributes[j_1] is False:
                temp_col_count -= 1


