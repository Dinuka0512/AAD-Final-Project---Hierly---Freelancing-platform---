import Validation from "../util/Validations.js";

// SIGN UP PAGE
var userType = $("#userType");
var txtFirstName = $("#firstName");
var txtLastName = $("#lastName");
var txtEmail = $("#email");
var txtPassword = $("#password");
var txtCp = $("#confirmPassword");
var btnSignUp = $("#signupBtn");

btnSignUp.on("click", function (e) {
    e.preventDefault(); // prevent form submission

    // Validate user type
    if (!Validation.isNotNull(userType.val())) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please select the user type'
        });
        return;
    }

    // Validate first and last name
    if (!Validation.isValidUserName(txtFirstName.val()) || !Validation.isValidUserName(txtLastName.val())) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Username',
            html: "Username can't have numbers or symbols<br>Only letters allowed"
        });
        return;
    }

    // Validate email
    if (!Validation.isValidEmail(txtEmail.val())) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Email',
            text: 'Please enter a valid email address'
        });
        return;
    }

    // Validate password strength
    if (!Validation.isStrongPassword(txtPassword.val())) {
        Swal.fire({
            icon: 'warning',
            title: 'Weak Password',
            html: 'Password must have min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char'
        });
        return;
    }

    // Check password match
    if (txtPassword.val() !== txtCp.val()) {
        Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Passwords do not match!'
        });
        return;
    }

    // All validations passed → create user object
    var user = {
        name: txtFirstName.val() + " " + txtLastName.val(),
        email: txtEmail.val(),
        password: txtPassword.val(),
        type: userType.val()
    };

    console.log(user);

    $.ajax({
        type: "POST",
        url: "",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function (data) {
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful',
                text: 'User object created! Check console for details.'
            });
        },
        error: function (data) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: xhr.responseJSON?.message || "Something went wrong!"
            });
        }
    });
});
