var all_Data = [];
var make_Data;
function make_Ajax_Relationship(url, method, data, callback){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            callback(this.responseText);
        }
    }
    req.open(method, url);
    req.send(data);
}
make_Ajax_Relationship("code_Plan_Functions.json", "GET", "", add_To_Var);
function add_To_Var(data){
    window.make_Data = JSON.parse(data);
}

function random_Id(){
    let id = "";
    for (let i = 0; i<10; i++){
        id += Math.ceil(Math.random()*10);
    }
    return (id);
}

function add_Item(list){ //[type_Of_Tag, id, this_Class, name, type, data, onclick, value]
    a = ["input", "br", "hr"];
    tag = "";
    for (let i = 0; i < a.length; i++){
        if (a[i] == list[0]){
            tag = `<${list[0]} type = "${list[4]}" id = "${list[1]}" class = "${list[2]}" name = "${list[3]}" value = "${list[7]}"/>`;
            break;
        }
    }
    if (!tag){
        if (list[6]){tag = `<${list[0]} id = "${list[1]}" class = "${list[2]}" name = "${list[3]}" onclick = "${list[6]}">${list[5]}</${list[0]}>`;}
        else{tag = `<${list[0]} id = "${list[1]}" class = "${list[2]}" name = "${list[3]}">${list[5]}</${list[0]}>`;}
    }
    return tag;
}

function array_Search(a, array, index){ //what, array, index
    this_Return = []
    for (let i = 0; i < array.length; i++){
            if (array[i][index] == a){
                this_Return = array[i];
            }
        }
    return this_Return;
}

function add_Bg(id, color){
    document.getElementById(id).style.background = color;
}

function add_Function(){
    select_Id = random_Id();
    options = "";
    option_Ides = []
    for (let i = 0; i< window.make_Data.functions.length; i++){
        option_Id = random_Id();
        options += add_Item(["option", option_Id, "option", window.make_Data.functions[i][3], "", window.make_Data.functions[i][0], "", window.make_Data.functions[i][0]]);
        option_Ides.push(option_Id);
    }
    select = add_Item(["select", select_Id, "select", "", "", options, "", ""]);
    div_Id = put_On_Div(select);
    add_Bg(div_Id, `rgb(${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random()*255)})`);
}
function add_Branching(){

}
function add_Cycle(){
    
}
function add_Varible(){

}

function add_Data(){
    types = [["function", add_Function], ["braching", []], ["cycle", []]];
    type = document.getElementById("type_Select").value;
    b = array_Search(type,types, 0)[1];
    html = ""
    b();
    console.log(html);
    //put_On_Div(html);
}

function put_On_Div(data){
    let id = random_Id();
    if (!data){
        data = "";
    }
    document.getElementById("conteiner").innerHTML += `<div class = "grid" id = "${id}">${data}</div>`;
    return id;
}
