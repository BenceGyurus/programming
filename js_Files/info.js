function request(url, data, method, callback){
    if (!method){
        method = "GET";
    }
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            callback(this.responseText);
        }
    }
    req.open(method, url);
    req.send(data)
}

function element_To_Conteiner(data){
    document.getElementById("conteiner").innerHTML = data;
}

function load(){
    list = [["string", "Karakterlánc"], ["number", "Szám/Integer"], ["boolean", "Boolean"], ["object", "Tömb/Lista"]];
    url = window.location.href;
    title = "";
    console.log(url.split("/"));
    if (url.split("/").length == 5){
        request(`${url.split("/")[4]}.html`, "", "GET", element_To_Conteiner);
        for (let i = 0; i < list.length; i++){
            if (list[i][0] == url.split("/")[4]){
                title = list[i][1];
            }
        }
        document.getElementById("title").innerHTML = title;
    }
}
load();