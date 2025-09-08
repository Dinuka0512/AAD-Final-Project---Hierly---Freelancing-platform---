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
        url: "http://localhost:8080/User/login",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(user),
        success: function (data) {
            //NOW SAVE THE TOKEN ON LOCAL STORAGE
            localStorage.setItem("key", data.data);
            alert("Login successful!");

            //NOW NEED TO REDIRECT TO THE OWN DASHBOARD
            var message = data.message;
            var role = message.split(" ")[0];
            var redirectTo = "";

            if (role === "Admin") {
                redirectTo = "admin.html";
            }else if (role === "Freelancer"){
                redirectTo = "freelancer-dashboard.html";
            }else if (role === "Client"){
                redirectTo = "client-dashboard.html";
            }else{
            }

            window.location.href = redirectTo;
        },
        error: function (data) {
            console.log(data);
            alert("Login failed!");
        }
    })
})