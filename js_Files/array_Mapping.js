function mapping(array){
    html = "";
    if (array){
        html = "[";
        for (let i = 0; i < array.length; i++){
            //console.log(array[i]);
            if (typeof array[i] != "object"){
                //console.log(array[i]);
                if (typeof array[i] != "string"){
                    html += `<label class = '${value_Type(array[i])}'>${array[i]}</label>`; //get_Type_Of_Value(array[i])
                }
                else{html += `<label class = '${value_Type(array[i])}'>"${array[i]}"</label>`;}
        }

        else{
            html += mapping(array[i]);
        }
        i < array.length-1 ? html += ",": "";
    }
    html += "]"
    }
    return html;
}

function value_Type(variable){
    list = [["boolean", "bool"], ["number", "num"], ["string", "str"], ["object", "obj"]];
    class_Name = ""
    for (let i = 0; i < list.length; i++){
        if (list[i][0] == typeof variable){
            class_Name = list[i][1];
        }
    }
    return class_Name;
}