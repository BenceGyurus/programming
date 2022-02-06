 function set_Style(){
    window_Width = window.innerWidth;
    window_Height = window.innerHeight;
    menu_Height = 100;
    height = window_Height-menu_Height;
    document.getElementById("conteiner").style.height = height+"px";
}
set_Style();