function calc(number){
    string_Number = String(number);
    bin = "";
    while (number>=1){
        console.log(number)
        bin=String(number%2)+bin;
        number = Math.floor(number/2);
    }
    return bin;
}

function number_Main(number){
    bin = calc(number)
    bit = bin.length;
    byte = Math.ceil(bit/8);
    return [bit, byte, bin]
}