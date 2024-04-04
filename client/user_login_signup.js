let password1 = document.getElementById("loginpw");
let password2 = document.getElementById("signuppw");
let checkbox1 = document.getElementById("logincheckbox");
let checkbox2 = document.getElementById("signupcheckbox");

    checkbox1.onclick = function(){
        if (checkbox1.checked){
            password1.type = "text";
        }
        else {
            password1.type = "password";
        }
    }

    checkbox2.onclick = function(){
        if (checkbox2.checked){
            password2.type = "text";
        }
        else {
            password2.type = "password";
        }
    }

