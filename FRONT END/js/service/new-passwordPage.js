let txtNewPassword = $("#newPassword");
let txtConfirmPw = $("#confirmPassword");
let btnUpdatePassword = $("#updatePassword");
let passwordMatch = $("#passwordMatch");

passwordMatch.css({
    "display": "none",
    "color": "red"
});

btnUpdatePassword.on("click", function (event) {
    event.preventDefault(); // prevent default form submission if inside form

    let newPassword = txtNewPassword.val();
    let confirmPassword = txtConfirmPw.val();

    if(newPassword === confirmPassword) {
        passwordMatch.css("display", "none"); // hide error if passwords match

        let user = {
            "email": localStorage.getItem("email"),
            "password": newPassword
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/User/UpdatePassword",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: function (data) {
                console.log(data);
                if (data.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Changed!',
                        text: 'Your password has been updated successfully.',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = "login.html";
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Password change failed. Please try again.',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (xhr) {
                let errorMsg = "Something went wrong. Please try again.";
                if (xhr.status === 500) {
                    errorMsg = "Server error. Try again later.";
                } else if (xhr.status === 0) {
                    errorMsg = "Cannot connect to server. Check your internet.";
                } else if (xhr.responseJSON?.message) {
                    errorMsg = xhr.responseJSON.message;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMsg,
                    confirmButtonText: 'OK'
                });
            }
        });
    } else {
        // Show password mismatch error
        passwordMatch.css("display", "block");
        passwordMatch.text("Passwords do not match!"); // optional, show message
    }
});
