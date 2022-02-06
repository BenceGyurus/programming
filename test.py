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
            if was < 0:
                open = False
            else:
                e += i
    if was == -1:
        e = add_Type(e)
    return [was, e] 

def add_Type(str):
    string = False
    list = []
    e = ""
    print(str)
    open_List = 0
    for i in str:
        string = control_String(i, string)
        if not string and i == "," and open_List == 0:
            print(e)
            a = ctrl_List(e)
            if a[0] == -1:
                list.append(a[1])
            else:
                list.append(e)
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
            list.append(e)
    return list
        
    

var = "[a,b,c,d,e,f,g]"

print(ctrl_List(var))