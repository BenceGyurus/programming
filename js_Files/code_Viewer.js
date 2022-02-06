function get_Code(url, data, method, callback){
    req = new XMLHttpRequest;
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            callback(this.responseText);
        }
    }
    req.open(method, url);
    req.send(data);
}

function open_Url(data){
    console.log(data);
    data = JSON.parse(data).data
    window.open("/kod/"+data, '_blank');;
}

function get_Url(file_Data){
    data = JSON.parse(file_Data);
    console.log(file_Data)
    get_Code("analysis", JSON.stringify({data: data.data}), "POST", open_Url);
}

function open_Analysis(){
    json = JSON.stringify({name: get_Name_Of_File()});
    console.log(json);
    get_Code("GET_PY_FILE", json, "POST", get_Url);
}

function number_Of_Lines_Element(number){
    document.getElementById("number_Of_Lines").innerHTML = "";
    number += Math.ceil(number*0.10);
    for (let i = 0; i < number; i++){
        document.getElementById("number_Of_Lines").innerHTML += "<label class = 'numberLine'>"+(i+1)+"</label><br />";
    }
    //document.getElementById("number_Of_Lines").style.width = "20px";
}

function get_Name_Of_File(){
    //full_Width = document.getElementById("number_Of_Lines")
    var name = "";
    if (window.location.href.split("/").length == 5){
        name = window.location.href.split("/")[4];
    }
    return name;
}

function element_To_Code(code){
    code = JSON.parse(code).code;
    document.getElementById("code").innerHTML = code;
    number_Of_Lines_Element(code.split("<br />").length);
}

function load_Code(){
    file_Name = get_Name_Of_File();
    if (file_Name){
        send_Name = JSON.stringify({"name":file_Name})
        get_Code("GET_THIS_CODE", send_Name, "POST", element_To_Code);
    }
}

function open_In_Engine(){
    
}

load_Code();
