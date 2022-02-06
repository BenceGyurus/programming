const http = require('http');
const fs = require('fs');
const reWriter = require("./code_Rewriter");

function open_File(file_Name){
    file = ""
    try {
        file = fs.readFileSync(file_Name);
    } catch{
        file = false;
    }
    return file
}

function add_Path(name){
    name = name.split("?")[0]
    if (name.split(".").length == 1){
    list = fs.readFileSync('open_This.json');
    list = JSON.parse(list).list
    if (name.split("/").length > 2){
        name = "/"+name.split("/")[1]
    }
    path = "error.html"
    for (let i = 0; i < list.length; i++){
        if (list[i][0] == name){
            path = list[i][1]
        }
    }
    }
    else{if (name.split("/").length > 2){
        name = "/"+name.split("/")[name.split("/").length-1]
        }
        path = name.split(".")[name.split(".").length-1]+"_Files"+name;
    }
    return path
}
function get_Header(url){
    send = "text";
    extension = url.split(".")[url.split(".").length-1];
    if (extension == "json"){
        send = "application";
    }
    else if (extension == "img" || extension == "png" || extension == "jpeg"){
        send = "image";
    }
    return send + "/" + extension;
}

function send_This(res,req, file, status,header){
    res.writeHead(status, {'Content-type' : header});
    res.end(file);
}

function send_Data(res,req){
    status = 200;
    path = req.url
    path = add_Path(path);
    header = get_Header(path);
    file = open_File(path);
    if (!file){
        file = open_File("html_Files/error.html");
        status = 404;
    }
    send_This(res,req, file,status ,header);
}
function random_File_Name(length){
    file_Name = ""
    for (let i = 0; i < length; i++){
        file_Name += Math.floor(Math.random()*10);
    }   
    return file_Name
}

function save_File(data, extension, path, res ,req){
    name = random_File_Name(10)
    file_Name = __dirname + path+"\\"+name+"."+extension
    //console.log(file_Name);
    fs.writeFile(file_Name, data, function (err){run_Code(file_Name,res ,req)});
    return file_Name;
}

function run_Code(file_Name, res, req){
    const { exec } = require("child_process");
    code = `python engine.py "${file_Name}"`;
    //code = "dir";
    //console.log(code)
    exec(code, (error, stdout, stderr) => {
        if (error) {
            //console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            //console.log(`stderr: ${stderr}`);
            return;
        }
    file_Name = stdout.split("\n")[0].split("\r")[0]
    json = fs.readFileSync(__dirname+"\\"+file_Name);
    json = JSON.parse(json);
    sent_Data = file_Name.split("\\")[1].split(".")[0];
    //console.log(sent_Data);
    sent_Data = JSON.stringify({data: sent_Data});
    send_This(res, req, sent_Data, 200, "json/application");
});
}

function run_Engine(data, res, req){
    file_Name = save_File(data, "py", "\\users_Files", res, req);
}

function post_Method(res, req, data){
    //console.log(data);
    path = req.url;
    path = path.split("/")[path.split("/").length-1];
    console.log(path);
    //console.log(path)
    if (path == "analysis"){
        data = JSON.parse(data)
        //console.log(data.data);
        run_Engine(data.data, res, req);
    }
    else if (path == "get_This_Json"){
        data = JSON.parse(data);
        try{
        file = open_File("users_Json/"+data.name+".json");
            status = 200;
        }catch{
            file = JSON.stringify({error: "Nincs ilyen file"});
            status = 404;
        }
        header = get_Header(data.name+".json");
        send_This(res,req, file, status,header);
    }
    else if (path == "get_This_Py"){
        data = JSON.parse(data)
        data = data.file_Name;
        let sent_Json;
        status = 200;
        try {
            file = open_File("users_Files/"+data);
            sent_Json = JSON.stringify({data: file.toString()})
        } catch (error) {
            sent_Json = JSON.stringify({error : "Nincs ilyen file"});
            status = 404;
        }
        header = get_Header("file"+".json");
        //console.log(sent_Json);
        send_This(res,req, sent_Json, status,header);
    }
    else if (path == "GET_THIS_CODE"){
        data = JSON.parse(data)
        data = data.name;
        status = 200;
        try {
            file = open_File("users_Code/"+data+"/read.html");
            sent_Json = JSON.stringify({code: file.toString()});
        } catch (error) {
            sent_Json = JSON.stringify({error : "Nincs ilyen file"});
            status = 404;
        }
        header = get_Header("file"+".json");
        //console.log(sent_Json);
        send_This(res,req, sent_Json, status,header);
    }
    else if (path == "UPLOAD_CODE"){
        data = JSON.parse(data);
        
        status = 200;
        dir = random_File_Name(15);
        data.title = "main";
        //console.log(data); 
        fs.mkdir("users_Code/"+dir, (err) => {
            fs.writeFileSync("users_Code/"+dir+"/"+data.title+".py", data.code);
            fs.writeFileSync("users_Code/"+dir+"/data.json", JSON.stringify(data));
            fs.writeFileSync("users_Code/"+dir+"/read.html", reWriter.main(data.code));
            sent_Data = JSON.stringify({url : dir});
            //console.log(send_Data);
            header = get_Header("file"+".json");
            send_This(res,req, sent_Data, status,header);
        });
    }
    else if (path == "GET_PY_FILE"){
        status = 200
        data = JSON.parse(data);
        file = fs.readFileSync("users_Code/"+data.name+"/"+"main.py");
        file = file.toString();
        console.log(file);
        header = get_Header("file"+".json");
        sent_Data = JSON.stringify({data: file});
        if (!file){
            status = 404;
        }
        send_This(res,req, sent_Data, status,header);
    }
}

const requestListener = function (req, res) {
    if (req.method == "GET"){
        send_Data(res, req);
    }
    else{
        //console.log(req.url);
        body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () =>{
            post_Method(res,req,body);
        });
    }
}

const server = http.createServer(requestListener);
server.listen(3000);