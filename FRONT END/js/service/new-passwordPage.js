let txtNewPassword = $("#newPassword");
let txtConfirmPw = $("#confirmPassword");
let btnUpdatePassword = $("#updatePassword");
let passwordMatch = $("#passwordMatch");

passwordMatch.css("display", "none");

btnUpdatePassword.on("click", function (event) {
    //CHECK PW and CPW
    if(txtNewPassword.val() === txtConfirmPw.val()) {
        $.ajax({
            type: "POST",
            url: "/users",
            dataType: "json",
            contentType: "application/json",
        })
    }else{
        passwordMatch.css("display", "block", passwordMatch.css("color", "red"));
    }
})