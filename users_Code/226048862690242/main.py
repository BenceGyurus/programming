import sys
import json
import random
oprators_Files = ["one_Chars_Operators.txt", "two_Chars_Operators.txt", "word_Operators.txt"]
all_Items = [] # [command [arguments --- > [ if [operator [this items], operator2 [this items]]]]
values_Of_Variables = []
errors = []
happend = []
all_Things = []

def split_To_Words(text):
    list = []
    e_List = text.split("\n")
    for i in range(0, len(e_List)):
        list.append(e_List[i].split(" "))
    return list
def open_In_List(file_Name):
    with open (file_Name, "r", encoding = "utf-8") as file:
        list = file.read().split("\n")
    return list
def control_Operators(x):
    global oprators_Files, errors, all_Things
    operators = open(oprators_Files[0], "r", encoding="utf-8").read().split("\n")
    parts = []
    operators = ["*", "/", "%", "+", "-"]
    primary_Operators = ["*", "/", "%"]
    secondary_Operators = ["+", "-"]
    this_ListX = list(x)
    include = []
    parts = []
    #print(x)
    open_String = False
    part = ""
    for k in this_ListX:
        #print(k)
        control = False
        for i in operators:
            if k == "'" or k == '"' and not open_String:
                open_String = True
            elif k == "'" or k == '"' and open_String:
                open_String = False
            if k == i and not open_String:
                include.append(i)
                parts.append(part)
                parts.append(i)
                part = ""
                control = True
        if not control:
            part+=k
    else:
        #print(part)
        if part != x:
            parts.append(part)
    if open_String:
        errors.append("Nincs lezárva az idézőjel")
    results = None
    #print(parts)
    for i in range(0, len(parts)):
        if i%2==1:
            #print(parts[i])
            if parts[i] == "*":
                if results == None:
                    try:
                        results = (value_Of_Variable(parts[i-1])*value_Of_Variable(parts[i+1]))
                    except:
                        errors.append("Nincs a művelet befejezve")
                elif results:
                    try:
                        #print(value_Of_Variable(parts[i+1]))
                        results*=value_Of_Variable(parts[i+1])
                    except:
                        errors.append("Nincs a művelet befejezve")
            elif parts[i] == "/":
                if results == None:
                    try:
                        results = (value_Of_Variable(parts[i-1])/value_Of_Variable(parts[i+1]))
                    except:
                        errors.append("Nincs a művelet befejezve")
                elif results:
                    try:
                        results /=value_Of_Variable(parts[i+1])
                    except:
                        errors.append("Nincs a művelet befejezve")
            elif parts[i] == "%":
                if results == None:
                    try:
                        results = (value_Of_Variable(parts[i-1])%value_Of_Variable(parts[i+1]))
                    except:
                        errors.append("Nincs a művelet befejezve")
                elif results:
                    try:
                        results %=value_Of_Variable(parts[i+1])
                    except:
                        errors.append("Nincs a művelet befejezve")
    for i in range(0, len(parts)):
        if i%2==1:
            #print(parts[i])
            if parts[i] == "+":
                if results == None:
                    try:
                        results = (value_Of_Variable(parts[i-1])+value_Of_Variable(parts[i+1]))
                    except:
                        errors.append("Nincs a művelet befejezve")
                elif results:
                    try:
                        control = True
                        #print(value_Of_Variable(parts[i+1]))
                        try:
                            a = int(results)
                        except:
                            control = False
                        if not control:
                            results+=str(value_Of_Variable(parts[i+1]))
                        else:
                            results+=value_Of_Variable(parts[i+1])
                    except:
                        errors.append("Nincs a művelet befejezve")
            elif parts[i] == "-":
                if results == None:
                    try:
                        results = (value_Of_Variable(parts[i-1])-value_Of_Variable(parts[i+1]))
                    except:
                        errors.append("Nincs a művelet befejezve")
                elif results:
                    try:
                        results -=value_Of_Variable(parts[i+1])
                    except:
                        errors.append("Nincs a művelet befejezve")
    if results == None:
        results = value_Of_Variable(x)
    return results


def add_To_All_List(data, index_List):
    global values_Of_Variables, oprators_Files, errors, happend
    operators = ["+", "-", "*", "/", "%"]
    for i in range(0, len(data)):
        if len(data[i].split("(")) > 1:
            out = ""
            this_ListX = list(data[i])
            end = ""
            open_this_ListIndex = 0
            open_List = []
            for k in this_ListX:
                if k == ")":
                    text = ""
                    index = len(open_List)-1
                    last = [True, -1]
                    if not open_List[len(open_List)-1][0]:
                        j = len(open_List)-1
                        added = False
                        while j >= 0:
                            if open_List[j][0]:
                                if not added:
                                    open_List[j][0] = False
                                    text = open_List[j][1]
                                    index = j
                                    added = True
                                else:
                                    last = [False, j]
                                    break
                            elif not open_List[j][0]:
                                pass
                            j-=1
                    else:
                        open_List[len(open_List)-1][0]=False
                        j = len(open_List)-1
                        while j >= 0:
                            if open_List[j][0]:
                                last = [False, j]
                                break
                            j-=1
                        text = open_List[len(open_List)-1][1]
                    #all_Things.append([values_Of_Variables[index_List[i][0]],[]])
                    open_List[index][2] = control_Operators(text)
                    if not last[0]:
                        if type(open_List[index][2]) == "":
                            open_List[last[1]][2] += f'"{open_List[index][2]}"'
                        else:
                            open_List[last[1]][1] += f"{open_List[index][2]}"
                        del open_List[index]
                add = False
                index = len(open_List)-1
                while index >= 0:
                    if open_List[index][0]:
                        if k != "(" and k != ")":
                            open_List[index][1] += k
                            add = True
                            break
                    index -= 1
                else: 
                    if not add:
                        pass
                if k == "(":
                    index = len(open_List)-1
                    open_List.append([True, "", ""])
                to_Out = True
                for f in open_List:
                    if f[0]:
                        to_Out = False
                else:
                    if to_Out and k != ")" and k != "(":
                        for a in range(open_this_ListIndex, len(open_List)):
                            out += f"{open_List[a][2]}"
                        open_this_ListIndex = len(open_List)
                        out += k
            for a in range(open_this_ListIndex, len(open_List)):
                out += f"{open_List[a][2]}"
            value = control_Operators(out)
            happend.append([values_Of_Variables[index_List[i]][0], value])
            values_Of_Variables[index_List[i]][1] = value
        else:
            value = control_Operators(data[i])
            values_Of_Variables[index_List[i]][1] = value
            happend.append([values_Of_Variables[index_List[i]][0], value])
        #values_Of_Variables[index_List[i]][1] = data[i]

def control_String(i, string):
    if i == "'" or i == '"':
        return not string
    else:
        return string


def ctrl_List(var):
    string = False
    open = False
    e = ""
    was = -2
    for i in var:
        string = control_String(i, string)
        if open and i != "]" or string:
            e += i
        if not string and i == "[" and not open:
            was = 0
            open = True
        elif not string and i == "[" and open:
            was += 1
        elif not string and i == "]" and open:
            was -= 1
            if was < 0: open = False
            else:
                e += i
    if was == -1:
        e = add_Type(e)
    return [was, e] 

def add_Type(str):
    string = False
    list = []
    e = ""
    open_List = 0
    for i in str:
        string = control_String(i, string)
        if not string and i == "," and open_List == 0:
            a = ctrl_List(e)
            if a[0] == -1:
                list.append(a[1])
            else:
                list.append(value_Of_Variable(e))
            e = ""
        else:
            if i == "[":
                open_List+=1
            elif i == "]":
                open_List-=1
            e += i
    else:
        a = ctrl_List(e)
        if a[0] == -1:
            list.append(a[1])
        else:
            list.append(value_Of_Variable(e))
    return list


def value_Of_Variable(value):
    global values_Of_Variables
    returned_Value = None
    if len(value.split("'")) > 1 or len(value.split('"')) > 1:
        listed_Value = list(value)
        returned_Value = ""
        for i in range(1, len(listed_Value)-1):
            returned_Value+=listed_Value[i]
    elif value == "True":
        returned_Value = True
    elif value == "False":
        returned_Value = False
    try:
        returned_Value = int(value)
    except:
        try:
            returned_Value = float(value)
        except:
            if returned_Value == None:
                for i in range(0, len(values_Of_Variables)):
                    if values_Of_Variables[i][0] == value:
                        returned_Value = values_Of_Variables[i][1]
    return returned_Value

def declarate(this_List):
    global values_Of_Variables
    name = []
    value = []
    all = ""
    open_This = False
    list_Type = False
    #this_List = open(file_Name, 'r',encoding = "utf-8").read()
    operators = open(oprators_Files[0], "r", encoding="utf-8").read().split("\n")
    for i in range(0, len(this_List)):
        if not open_This:
            all += f"{this_List[i]}"
        else:
            all+= f" {this_List[i]}"
        if len(this_List[i].split('"'))%2==0 or len(this_List[i].split('"'))%2==0:
            open_This = not open_This
    #print(all)
    was = False
    string = False
    e = ""
    for i in all:
        if i == "'" or i == '"':
            string = not string
        if i == "=" and not string and not was:
            was = True
        #if i == "," and not string and was:
        #    value.append(e)
        #    e = ""
        elif was:
            if i != "=":
                e += i
            elif string:
                e += i
    else:
        if e:
            value.append(e)
    a = ctrl_List(value[0])
    if a[0] == -2:
        v = value[0]
        value2 = []
        string = False
        e = ""
        for i in v:
            string = control_String(i, string)
            if not string and i == ",":
                value2.append(e)
                e = ""
            else:
                e += i
        else:
            if e:
                value2.append(e)
        if len(value2):
            value = value2
    else:
        value = [a[1]]
        list_Type = True
    index = 0
    string = False
    add = ""
    v_Name = True
    was = False
    for i in all:
        if i == "'" or i == '"':
            string = not string
            add += i
        if add and not string and i == "," or i == "=":
            control = True
            for j in operators:
                stri = False
                for k in add:
                    if k == "'" or k == '"':
                        stri = not stri
                    if j == k and not stri:
                        control = False
                        name.append(add.split(j)[0])
                        value[index]= f"{add.split(j)[0]}{j}{value[index]}"
            else:
                if control:
                    name.append(add)
                    add = ""
            index += 1
        else:
            add += i
    index_List = []
    index1 = 0
    if list_Type:
        values_Of_Variables.append([name[0], value])
    else:
        for i in name:
            control = False
            for k in range(0, len(values_Of_Variables)):
                if i == values_Of_Variables[k][0]:
                    control = True
                    #values_Of_Variables[k][1] = None
                    index_List.append(k)
            if not control:
                values_Of_Variables.append([i, None])
                index_List.append((len(values_Of_Variables)-1)+index1)
        add_To_All_List(value, index_List)

def random_Name(length):
    name = str(random.randint(1*length, 9*length))
    return name

def main(name):
    global all_Items
    sintax_Error = []
    file_Data = open(name, "r", encoding = "utf-8").read()
    list = split_To_Words(file_Data)
    last_Item = False
    end = True
    comment = False
    for i in range(0, len(list)):
        if len(list[i]) > 4:
            for j in (0, 3):
                if list[i][j] != "":
                    end = False
            else:
                if end and last_Item:
                    all_Items[len(all_Items)-1].append(list[i])
                else:
                    last_Item = False
        else:
            last_Item = False
        was = False
        rewas = False
        new_List = []
        comment = False
        for j in list[i]:
            if j == "=" and not was or len(j.split("=")) == 2 and rewas == False:
                was = True
            elif j == "=" and was:
                was = False
                rewas = True
            new_J = ""
            if len(j.split("#")) >= 1:
                for k in j:
                    if k != "#" and not comment:
                        new_J+=k
                    else:
                        comment = True
                else:
                    j = new_J
            if j and not comment:
                new_List.append(j)
        else:
            if was:
                if len(new_List) > 1:
                    declarate(new_List)
    json1 = {"all" : happend, "end" : values_Of_Variables, "file_Name" : name.split("\\")[len(name.split("\\"))-1]}
    json1 = json.dumps(json1)
    string_Json = f'{json1}'
    this_File = f"users_Json\\{random_Name(1000)}.json"
    open(this_File, "w", encoding = "utf-8").write(string_Json)
    return this_File
var = main(sys.argv[1])
print(var)