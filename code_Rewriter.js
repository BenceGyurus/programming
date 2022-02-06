function main(code){
    replace_List = [[" ", "&nbsp"], ["\n", "<br />"], ["\t", "&nbsp&nbsp&nbsp&nbsp"]];
    class_List = [["if", "branching"], ["else", "branching"], ["elif", "branching"], ["with", "function"] ,["open", "function"], ["and", "operators"], ["or", "operators"], ["not", "operators"], ["True", "boolean"], ["False", "boolean"] ,["def", "function"], ["import", "function"], ["from", "function"], ["while", "branching"], ["for", "branching"], ["try", "function"], ["except", "function"], ["global", "function"]]
    new_Code = code;
    new_Code = control_Function(code);
    for (let i = 0; i < class_List.length; i++){
        new_Code = add_Element(new_Code, class_List[i][0], class_List[i][1]);
    }
    new_Code = add_Comments(new_Code);
    for (let i = 0; i < replace_List.length; i++){
        new_Code = to_Replace(new_Code,replace_List[i][0],replace_List[i][1]);
    }
    //new_Code = control_String(new_Code);
    return new_Code;
}

function add_Comments(text){
    string = [false, ""];
    new_Text = "";
    comment = false
    for (let i = 0; i < text.length; i++){
        string  = control_Str(text, i, string);
        if (!string[0] && text[i] == "#"){
            new_Text += "<label class = 'comment'>";
            comment = true
        }
        if (comment && text[i] == "\n"){
            new_Text += "</label>";
            comment = false;
        }
        new_Text+= text[i];
    }
    return new_Text;
}

function control_Str(text, i, string){
    if (text[i] == "'" || text[i] == '"'){
        if (string[0] && string[1] == text[i] && last_Char != "\\"){
            string[0] = false;
        }
        else if (!string[0]){
            string = [true, text[i]];
        }
    }
    return string;
}

function control_Function(text){
    open = []
    new_Text = "";e = "";
    add_To_The_End = false;
    operators = ["*", "+", "-", "/", "%"];
    word = ""
    string = [false, ""];
    last_Char = "";
    for (var i = 0; i < text.length; i++){
        next = true;
        string = control_Str(text, i, string);
        if (text[i] == "(" && i > 0 && !string[0]){
            for (let j = 0; j < operators.length; j++){
                if (operators[j] == text[i-1]){
                    next = false;
                }
            }
            if (next){open.push(true);word ="<label class = 'function_Name'>"+word}
        }
        if (text[i] == ")" && !string[0]){
            k = open.length-1
            //console.log(open);
            while (k >= 0){
                if (open[k]){
                    open[k] = false;
                    k = 0;
                    add_To_The_End = true;
                    break;
                }
                k--;
            }
        }
        if (text[i] == " " || text[i] == "\n" || text[i] == "," || text[i] == "\t"){
            new_Text += word+text[i];
            word = ""
        }
        else{
            //console.log(new_Text);
            word += text[i];
        }
        if (add_To_The_End){
            word += "</label>";
            add_To_The_End = false;
        }
    }
    last_Char = text[i];
    new_Text += word
    return new_Text;
}

function control_String(text){
    e = "";
    open = false;
    open_With = "";
    plus = ""
    tag = false;
    for (let i = 0; i < text.length; i++){
        if (text[i] == "<"){
            tag = true;
        }
        if (!open && text[i] == "'" || !open && text[i] == '"' && !tag || text[i] == "\t"){
            open = true;
            open_With = text[i];
            plus = "<label class = 'string'>"
        }
        else if (open && text[i] == open_With && open_With && !tag){
            open = false;
            open_With = "";
            plus = "</label>"
        }
        if (open && !tag){
            e += plus;
        }
            e += text[i]
        if (!open && !tag){
            e += plus
        }
        if (text[i] == ">"){
            tag = false;
        }
        plus = "";
    }
    return e;
}

function add_Element(text, a, b){
    new_Text = "";
    e = ""
    if (text.split(a).length > 1){
    for (let i = 0; i < text.length; i++){
        add = true;
        //console.log(e, a);
        if (e == a){
            e = "<label class = '"+b+"'>"+e+"</label>";
            new_Text += e;
            e = "";
        }
        if (text[i] == " " || text[i] == "\n" || text[i] == "," || text[i] == "\t"){
            new_Text += e+text[i];
            e = "";
            add = false;
        }
        if (add){
        e += text[i];
        }
    }
    new_Text += e;
    }
    else{
        new_Text = text;
    }
    
    return new_Text;
}

function to_Replace(text,a, b){ //a = what b = to what
    word = false;
    new_Text = "";
    tag = false;
    if  (a.length > 1){
        word = true;
    }
    e = ""
    for (let i = 0; i < text.length; i++){
        add = true;
        if (text[i] == "<"){
            tag = true;
        }
        if (!word && text[i] == a && !tag){
            e+= b;
            add = false
        }
        else if (word && e == a && !tag){
            e = b;
        }
        if (text[i] == " " || text[i] == "\n"){
            new_Text += e;
            e = "";
        }
        if (add){
        e += text[i];
        }
        if (text[i] == ">"){
            tag = false;
        }
    }
    new_Text += e;
    return new_Text;
}

module.exports = {main}