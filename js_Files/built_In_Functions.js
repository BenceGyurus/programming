function sum(array){
    summed = 0;
    for (let i = 0; i < array.length; i++){
        summed += array[i];
    }
    return summed;
}

function search_In_Array(array, value){
    index = false;
    for (let i = 0; i < array.length; i++){
        if (array[i] == value){
            index = i;
            break;
        }
    }
    return index;
}

/*function search(text){

}*/