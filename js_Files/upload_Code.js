function get_Datas(){
    err = [];
    let data;
    let title;
    try{
    title = document.getElementById("title_Of_Code").value;
    }catch{}
    code = document.getElementById("code_Input").value;
    if (!code){
        err.push("Kérlek írjál be kódot!");
    }else{
        data = JSON.stringify({title: title, code: code});
    }
    return [data,err];
}

function open_Url(data){
    window.open("/kodfigyelo/"+data, '_blank');;
}

function log_Result(json){
    json = (JSON.parse(json));
    open_Url(json.url);
    document.getElementById("link").style.display = "block";
    document.getElementById("copy_Link").value = "http://127.0.0.1:8080/kodfigyelo/"+json.url;
}

function upload(){
    d = get_Datas();
    if (d[1].length < 1){
        send_Data1("UPLOAD_CODE", d[0], "POST", log_Result);
    }
}
function send_Data1(url, data, method, callback){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            callback(this.responseText);
        }
    }
    req.open(method, url);
    req.send(data);
}

function copy(){
    copyText = document.getElementById("copy_Link");
    copyText.select(); //from w3s
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

function close_This(){
    console.log(close);
    document.getElementById("link").style.display = "none";
}