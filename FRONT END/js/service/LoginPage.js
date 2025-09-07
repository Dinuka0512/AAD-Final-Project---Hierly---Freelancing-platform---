import Validation from "../util/Validations.js";

//LOGIN PAGE
var txtEmail = $("#email");
var txtPassword = $("#password");
var btnLogin = $("#logIn");

btnLogin.on("click", function (e) {
    var user = {
        "email": txtEmail.val(),
        "password": txtPassword.val()
    };

    $.ajax({
        type: "POST",
        url: "/login",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data);
        }
    })
})