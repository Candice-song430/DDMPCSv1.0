class RulesAlgorithm:
    '''
        RulesAlgorithm
    '''

    def __init__(self, inputData):
        self.attributes = []
        self.myDiscernibilityMatrix = []
        self.inputData = inputData
        self.rows = inputData.iRows
        self.columns = inputData.jColumns
        self.myData = []
        self.myRules = []
        self.rules_count = 0
        self.Pos = []


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
        position = 0

        for i in range(1, self.rows):

            if temp[i] is True:
                for j in range(0, self.columns):
                    self.myData[position][j] = inputData.myRegularData[i][j]
                position = position + 1

        self.rows = row_count


    def Generate_POS(self):
        '''
            Generate_POS
        '''
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


    def Rules_Output(self):
        '''
            Rules_Output
        '''
        count = 0
        position = 0

        self.myRules = [[0] * self.columns for _ in range(self.rules_count)]
        Pos = self.Pos
        attributes = self.attributes
        inputData = self.inputData

        for i in range(2, self.rows):
            if Pos[i] is True:
                for k in range(1, i):

                    if (
                        Pos[k] is True
                        and attributes[i][self.columns - 1]
                        == attributes[k][self.columns - 1]
                    ):

                        count = 0

                        for j in range(0, self.columns - 1):
                            if attributes[i][j] == attributes[k][j]:
                                count = count + 1
                            else:
                                break

                        if count == self.columns - 1:
                            Pos[i] = False
                            self.rules_count = self.rules_count - 1

        inputData.num_of_rules = self.rules_count

        for i in range(1, self.rows):

            if Pos[i] is True:

                for j in range(0, self.columns):

                    self.myRules[position][j] = attributes[i][j]

                position = position + 1


    def getIfThenRes(self):
        '''
            getIfThenRes
        '''
        result = []
        Public_Data = self.inputData
        Public_Data.myRules = self.myRules
        Public_Data.myRules.sort(key=lambda x:x[-1])
        for i in Public_Data.myRules:
            print(i)
        rule_count = self.rules_count
        row = Public_Data.iRows
        col = Public_Data.jColumns

        count_1 = 0
        count_2 = 0
        total = 0



        for i in range(rule_count):
            result.append([])
            for j in range(col - 1):
                if Public_Data.myRules[i][j] != -1:
                    total += 1

            support_1 = 0
            support_2 = 0

            for k in range(1, row):

                count_1 = 0
                count_2 = 0

                j = 0
                while j < col - 1:
                    if Public_Data.myRules[i][j] != -1:
                        count_1 += 1

                        if Public_Data.myRules[i][j] == Public_Data.myRegularData[k][j]:
                            count_2 += 1
                    j += 1

                if count_1 == count_2:
                    if (
                        Public_Data.myRules[i][col - 1]
                        == Public_Data.myRegularData[k][col - 1]
                    ):
                        support_1 += 1
                        support_2 += 1
                    else:
                        support_1 += 1

            cont = "IF  "
            count = 0
            j = 0
            while j < col - 1:
                if Public_Data.myRules[i][j] != -1:
                    count += 1
                    cont += Public_Data.myOriginalData[0][j]
                    cont += " = "
                    cont += Public_Data.attributes_map[j][Public_Data.myRules[i][j]]

                    if count != count_1:
                        cont += "  AND  "
                j += 1

            result[-1].append(cont)

            cont = ""
            cont += Public_Data.myOriginalData[0][col - 1]
            cont += " = "
            cont += Public_Data.attributes_map[col - 1][
                Public_Data.myRules[i][col - 1]
            ]
            result[-1].append(cont)
            result[-1].append(support_1)
            conf = float(support_2) / float(support_1)
            result[-1].append(conf)

        return result
        

    def getTableRes(self):

        result = []
        rules = self.myRules
        col = self.columns
        attributes_map = self.inputData.attributes_map

        for i in range(self.rules_count):
            result.append([])
            for j in range(col):
                if rules[i][j] == -1:
                    result[-1].append("")
                else:
                    result[-1].append(attributes_map[j][rules[i][j]])

        return result


    def getConfusionMatrix(self):

        rule_count = self.rules_count
        inputData = self.inputData
        rules = self.myRules
        rows = inputData.iRows
        columns = inputData.jColumns
        CM_rows = len(inputData.attributes_map[columns - 1])
        temp = [False]*CM_rows
        CM = [[0] * CM_rows for _ in range(CM_rows)]

        for i in range(1, rows):
        
            for k in range(rule_count):
                count_1 = 0
                count_2 = 0

                for j in range(columns-1):
                    if rules[k][j] != -1:
                        count_1 += 1

                        if rules[k][j] == inputData.myRegularData[i][j]:
                            count_2 += 1
                        
                if count_1 != 0 and count_1 == count_2:
                
                    if rules[k][columns - 1] != inputData.myRegularData[i][columns - 1]:
                    
                        for j in range(CM_rows):
                            temp[j] = False
                        
                        temp[rules[k][columns - 1]] = True
                        break
                    
                    else:
                        temp[rules[k][columns - 1]] = True
                    
            for k in range(CM_rows):
                if temp[k] is True:
                    CM[inputData.myRegularData[i][columns - 1]][k] += 1
                    temp[k] = False
                
        for k in range(CM_rows):
            CM[k].insert(0, inputData.attributes_map[columns - 1][k])

        return CM
    

    def getResInfo(self):

        total = 0
        rules = self.myRules
        for i in range(self.rules_count):
            for j in range(self.columns-1):
                if  rules[i][j] != -1:
                    total += 1
        avglen = float(total) / float(self.rules_count)
        return {'rulesNum':self.rules_count, 'rulesAvgLength':avglen}


class RulesAlgorithm1(RulesAlgorithm):

    
    def run(self):
        self.Delete_Repetition()
        self.Generate_POS()
        self.Generate_DiscernibilityMatrix()
        self.Generate_Rules()
        self.Rules_Output()


    def Generate_DiscernibilityMatrix(self):

        count = 0
        row = self.rows
        col = self.columns
        position = 0
        myAttr = [0] * (col - 1)
        inputData = self.inputData
        myData = self.myData
        Pos = self.Pos
        self.myDiscernibilityMatrix = [
            [[0] * col for i in range(row)] for j in range(row)
        ]
        myDiscernibilityMatrix = self.myDiscernibilityMatrix
        #print(myDiscernibilityMatrix)
        self.attributes = [[0] * col for _ in range(row)]
        attributes = self.attributes

        for i in range(2, self.rows):
            for k in range(1, i):

                if myData[i][self.columns - 1] != myData[k][self.columns - 1]:
                    count = 0
                    position = 0

                    for j in range(0, self.columns - 1):

                        if myData[i][j] != myData[k][j]:

                            myAttr[j] = 1
                            position = j
                            count = count + 1

                    if count == 1:

                        if self.Pos[i] is True:

                            attributes[i][position] = -1
                            attributes[i][self.columns - 1] += 1
                            myDiscernibilityMatrix[i][k][position] = 1
                            myDiscernibilityMatrix[i][k][self.columns - 1] = count

                        if self.Pos[k] is True:

                            attributes[k][position] = -1
                            attributes[k][self.columns - 1] += 1
                            myDiscernibilityMatrix[k][i][position] = 1
                            myDiscernibilityMatrix[k][i][self.columns - 1] = count

                        myAttr[position] = 0

                    if count > 1:
                        if Pos[i] is True and Pos[k] is True:
                            for j in range(0, self.columns - 1):
                                if myAttr[j] == 1:
                                    myDiscernibilityMatrix[i][k][j] = 1
                                    if attributes[i][j] != -1:
                                        attributes[i][j] = attributes[i][j] + 1

                                    myDiscernibilityMatrix[k][i][j] = 1
                                    if attributes[k][j] != -1:
                                        attributes[k][j] = attributes[k][j] + 1

                                    myAttr[j] = 0

                            attributes[i][self.columns - 1] += 1
                            myDiscernibilityMatrix[i][k][self.columns - 1] = count

                            attributes[k][self.columns - 1] += 1
                            myDiscernibilityMatrix[k][i][self.columns - 1] = count
                        else:
                            if Pos[i] is True:
                                for j in range(0, self.columns - 1):
                                    if myAttr[j] == 1:
                                        myDiscernibilityMatrix[i][k][j] = 1
                                        if attributes[i][j] != -1:
                                            attributes[i][j] = attributes[i][j] + 1

                                attributes[i][self.columns - 1] += 1
                                myDiscernibilityMatrix[i][k][self.columns - 1] = count

                            if Pos[k] is True:

                                for j in range(0, self.columns - 1):

                                    if myAttr[j] == 1:
                                        myDiscernibilityMatrix[k][i][j] = 1
                                        if attributes[k][j] != -1:
                                            attributes[k][j] = attributes[k][j] + 1

                                attributes[k][self.columns - 1] += 1
                                myDiscernibilityMatrix[k][i][self.columns - 1] = count

                            for j in range(0, self.columns - 1):
                                myAttr[j] = 0


    def Max_Attribute(self, i):

        max_attr = 0
        attributes = self.attributes
        for j in range(0, self.columns - 1):
            if attributes[i][j] < 0:
                attributes[i][j] = 0
                return j
            else:
                if attributes[i][j] > attributes[i][max_attr]:
                    max_attr = j

        attributes[i][max_attr] = 0
        return max_attr


    def Generate_Rules(self):

        max_attr = 0
        position = 0

        Pos = self.Pos
        temp_rule = [False] * self.columns
        myData = self.myData
        attributes = self.attributes
        myDiscernibilityMatrix = self.myDiscernibilityMatrix
        self.rules_count = 0

        for i in range(1, self.rows):
            if Pos[i] is True:
                self.rules_count = self.rules_count + 1
                position = attributes[i][self.columns - 1]

                while position != 0:

                    max_attr = self.Max_Attribute(i)
                    temp_rule[max_attr] = True

                    for k in range(1, self.rows):
                        if myDiscernibilityMatrix[i][k][max_attr] == 1:

                            for j in range(0, self.columns):
                                myDiscernibilityMatrix[i][k][j] = 0

                            position = position - 1

                temp_rule[self.columns - 1] = True
                for j in range(0, self.columns):
                    if temp_rule[j] is True:
                        attributes[i][j] = myData[i][j]
                        temp_rule[j] = False
                    else:
                        attributes[i][j] = -1


class RulesAlgorithm2(RulesAlgorithm):


    def run(self):
        self.Delete_Repetition()
        self.Generate_POS()
        self.Generate_Deduct()
        self.Rules_Output()


    def Generate_Deduct(self):

        i = None
        j_1 = None
        j_2 = None
        k = None
        temp_col_count = None
        count = None

        rows = self.rows
        columns = self.columns
        temp_rule = [True] * columns
        self.attributes = [[0] * columns for _ in range(rows)]
        attributes = self.attributes
        myData = self.myData
        Pos = self.Pos

        rules_count = 0

        i = 1
        while i < rows:
            if Pos[i]: # 每个正区域对象；
                rules_count += 1
                temp_col_count = columns - 2 # 最大值；

                j_1 = 0
                while j_1 < columns - 1: # 测试每个条件属性；
                    temp_rule[j_1] = False

                    k = 1
                    while k < rows:
                        if myData[i][columns - 1] != myData[k][columns - 1]:
                            count = 0

                            j_2 = 0
                            while j_2 < columns - 1:
                                if temp_rule[j_2] and myData[i][j_2] == myData[k][j_2]:
                                    count += 1
                                j_2 += 1

                            if count == temp_col_count:
                                temp_rule[j_1] = True
                                break
                        k += 1

                    if temp_rule[j_1] == False:
                        temp_col_count -= 1
                    j_1 += 1

                j_1 = 0
                while j_1 < columns:
                    if temp_rule[j_1]:
                        attributes[i][j_1] = myData[i][j_1]
                        pass
                    else:
                        attributes[i][j_1] = -1

                        temp_rule[j_1] = True
                    j_1 += 1
            i += 1
        
        self.rules_count = rules_count
