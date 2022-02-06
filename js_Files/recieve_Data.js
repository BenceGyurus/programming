function send_Data(data, url, method, callback){
    console.log("sending");
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            callback(this.responseText);
        }
    }
    req.open(method, url);
    console.log(data);
    req.send(data);
    console.log("sent");
}
function get_Data(){
    data = document.getElementById("code_Input").value;
    return data;
}

function element_Datas(json){
    json = JSON.parse(json);
    console.log(json);
    loc =  window.location.href;
    new_Location = ""
    if (loc.split("/").length > 2){
        for (let i = 0; i <= 3; i++){
            new_Location+=loc.split("/")[i]+"/"; 
        }
    }
    else{
        new_Location = loc+"/";
    }
    window.location.href = new_Location+json.data;
}

function read_Json(data){
    return JSON.parse(data);
}


function send_Code(){
    data = get_Data();
    json_Data = JSON.stringify({data: data});
    console.log(data);
    send_Data(json_Data, "analysis", "POST", element_Datas);
}

function load_To_Text_Area(data){
    data = JSON.parse(data).data
    document.getElementById("code_Input").value = data;
}

function load_Datas(json){
    json = JSON.parse(json);
    console.log(json);
    if (json.error){

    }
    else{
        window.data = json;
        new_Json = JSON.stringify({file_Name: json.file_Name});
        send_Data(new_Json, "get_This_Py", "POST", load_To_Text_Area);
    }
}

function onLoad(){
    query_Name = window.location.href.split("/")[window.location.href.split("/").length-1];
    json = JSON.stringify({"name" : query_Name});
    send_Data(json, "get_This_Json", "POST", load_Datas);
}

onLoad();
function get_Type_Of_Value(value){
    returned = "";
    list = [["boolean", "bool"], ["number", "num"], ["string", "str"], ["object", "obj"]];
    for (let i = 0; i < value.length; i++){
        for (let k = 0; k < list.length; k++){
            add = "";
            if (i != value.length-1){
                add = ","
            }
            console.log(value[i]);
            if ((typeof value[i]) == list[k][0] && (typeof value[i]) != "object"){
                returned += "<label class = '"+list[k][1]+"'>"+value[i]+"</label>"+ add+" ";
            }
            else if ((typeof value[i]) == "object"){
                returned += "<label class = '"+list[k][1]+"'>"+get_Type_Of_Value(value[i])+"</label>"+ add+" ";
            }
        }
    }
    console.log(returned)
    return returned;
} 

function dir_To_Array(array, index){
    return (array[index]);
}

function get_This_Type(variable){
    list = [["boolean", "bool"], ["number", "num"], ["string", "str"], ["object", "obj"]];
    cl = "";
    for (let i = 0; i < list.length; i++){
        if ((typeof variable) == list[i][0]){
            cl = list[i][1];
        }
    }
    return cl;
}

function get_This(data){
    list = [["#a66300", "string"], ["number", "#001278"]];
    color = ""
    for (let i = 0; i < list.length; i++){
        if (list[i][1] == data){
            color = list[i][0]
        }
    }
    document.getElementById("recieve_Data").style.color = color;
    send_Data("", `${data}.html`,"GET", element_To_Recieve);
}

function element_To_Recieve(datas){
    document.getElementById("recieve_Data").innerHTML = datas;
}
function random_Id(){
    id = "";
    for (let i = 0; i < Math.ceil(Math.random()*100)+10; i++){
        id += String(Math.ceil(Math.random()*10));
    }
    return id;
}

function memory_Graphic(size, string_Binary){
    for (let i = 0; i < size; i++){
        id = random_Id()
        color = ""
        text = "";
        if (string_Binary[i] == "0"){
            color = "red";
            text = "0"
        }
        else if (string_Binary[i]){
            color = "green";
            text = "1"
        }
        else{
            text = " ";
            color = "blue";
        }
        document.getElementById("recieve_Data").innerHTML += `<div id = "${id}" class = "ram">${text}</div>`;
        document.getElementById(id).style.background = color;
    }
}


function document_To_Ram_Number(value, size, binary){
    string_Binary = String(binary);
    document.getElementById("recieve_Data").innerHTML = `<h2>${value} binálisan: ${binary}</h2><h2>Ez a RAM-ban:</h2><p class = "ram_Datas">${size}bit (${size/8}byte), mivel minden binális szám 1bit-et foglala el a RAM-ban, de az integer típusú változók deklarálásával 28byte-ot inicializálnak, amit 28*8 = ${28*8}bit</p>`;
    memory_Graphic(size,string_Binary);
}

function info(var_Name){
    datas = []
    for (let i = 0; i < window.data.end.length; i++){
        if (window.data.end[i][0] == var_Name){
            a = number_Main(window.data.end[i][1]);
            bit = a[0];
            byte = a[1];
            binary = a[2];
            document_To_Ram_Number(window.data.end[i][1], bit, binary);
        }
    }
    if (bit && byte){

    }
}


function query_Data(){
    variable_Name = document.getElementById("command_Line").value;
    console.log(window.data);
    index_List = [];
    let value;
    let name;
    let color;
    let str = false;
    if (variable_Name.split("[").length > 1 && variable_Name.split("]").length > 1){
        let open = false;
        e = ""
        name = ""
        for (let i = 0; i < variable_Name.length; i++){
            if (open && variable_Name[i] != "]"){
                e += variable_Name[i];
            }
            else if (!open && variable_Name[i] != "[" &&  variable_Name[i] != "]"){
                name += variable_Name[i];
            }
            if (variable_Name[i] == "["){
                open = true;
            }
            else if (variable_Name[i] == "]"){
                open = false
                if (Number(e)){
                    e = Number(e);
                }
                console.log(e);
                index_List.push(e);
                e = "";
            }
        }
    }console.log(index_List);
    if (index_List.length >= 1){
        list = "";
        console.log(window.data.end);
        for (let k = 0; k < window.data.end.length; k++){
            if (name == window.data.end[k][0]){
                list = window.data.end[k][1][0];
            }
        }
        for (let i = 0; i < index_List.length; i++){
            console.log(list, index_List[i]);
            list = dir_To_Array(list, index_List[i]);
            console.log(list);
        }
        value = list;
        console.log(value);
        color = get_This_Type(value);
        console.log(color);
        if (color == "str"){
            str = true;
        }
    }
    else{
    list = [["boolean", "bool"], ["number", "num"], ["string", "str"], ["object", "obj"]];
    console.log(window.data.end)
    for (let i = 0; i < window.data.end.length; i++){
        if (window.data.end[i][0] == variable_Name){
            value = []
            for (let j = 0; j < list.length; j++){
                if (list[j][0] == typeof window.data.end[i][1]){
                    color = list[j][1]
                }
                if (typeof window.data.end[i][1] == "string"){
                    str = true;
                }
            }
            console.log(window.data.end[i][0])
            name = window.data.end[i][0];
            //console.log(window.data.end[i][1]);
            if (color == "obj"){
                value = window.data.end[i][1][0];
            }
            value = window.data.end[i][1];
        }
    }
    }
    if (!value){
        color = "un";    
    }
    if(str || color !="obj"){
    document.getElementById("last_Queries").innerHTML += "<div class = 'grid'><p class = 'query'><label class = 'arrows'>&#x2756;</label>"+variable_Name+"<label class = 'information' onclick = 'info(\""+variable_Name+"\")'>i</label></p><p class = '"+color+"' id = 'value'><label class = 'arrows'>&#x276D;</label> "+value+"</p></div>";
    }
    else if (color != "obj"){
        document.getElementById("last_Queries").innerHTML += "<div class = 'grid'><p class = 'query'><label class = 'arrows'>&#x2756;</label>"+variable_Name+"<label class = 'information' onclick = 'info(\""+variable_Name+"\")'>i</label></p><p class = '"+color+"' id = 'value'><label class = 'arrows'>&#x276D;</label> \""+value+"\"</p></div>";
    }
    else{
        document.getElementById("last_Queries").innerHTML += "<div class = 'grid'><p class = 'query'><label class = 'arrows'>&#x2756;</label>"+variable_Name+"<label class = 'information' onclick = 'info(\""+variable_Name+"\")'>i</label></p><p class = '"+color+"' id = 'value'><label class = 'arrows'>&#x276D;</label> "+mapping(value[0])+"</p></div>";
    }
    document.getElementById("command_Line").value = "";
}