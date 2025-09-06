// SIGN UP PAGE
var userType = $("#userType");
var txtFirstName = $("#firstName");
var txtLastName = $("#lastName");
var txtEmail = $("#email");
var txtPassword = $("#password");
var txtCp = $("#confirmPassword");


userType.on("input", function (e) {
    console.log(userType.val());
})

