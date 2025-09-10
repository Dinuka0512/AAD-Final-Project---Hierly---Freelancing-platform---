let btnVerify = $("#verifyOtp");
let resendOtp = $("#resendLink");
let txtOtp = $("#otp");
var email = localStorage.getItem("email");

resendOtp.on("click", function (e) {
    sendEmail(email);
})

function  sendEmail(email){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/SendMail",
        dataType: "json",
        contentType: "application/json",
        data: email,
        success: function (data) {
            Swal.close();
            sendOtp.prop("disabled", false);

            // Show success/error alert
            Swal.fire({
                icon: data.data ? "success" : "error",
                title: data.data ? "Mail Sent!" : "Mail Failed!",
                text: data.data ? "OTP has been sent to your email." : "Something went wrong.",
                confirmButtonText: "OK"
            })
        },
        error: function (xhr) {
            Swal.close();
            sendOtp.prop("disabled", false);

            let errorMsg = "Something went wrong.";
            switch (xhr.status) {
                case 500:
                    errorMsg = "Server error. Please try again later.";
                    break;
                case 0:
                    errorMsg = "Cannot connect to the server. Check your internet.";
                    break;
                default:
                    errorMsg = xhr.responseJSON?.message || "Unexpected error occurred.";
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg
            });
        }
    })
}

btnVerify.on("click", function (e) {
    var otp = txtOtp.val();
    verifyOtp(otp, email);
})

function verifyOtp(otp) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/Verify?otp=" + otp,
        contentType: "application/json",
        dataType: "json",
        data: email,
        success: function (data) {
            if (data.data) {
                // OTP verified successfully
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Verified!',
                    text: 'You will be redirected shortly.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Navigate to another page AFTER clicking OK
                    window.location.href = "new-password.html";
                });
            } else {
                // OTP invalid
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid OTP',
                    text: 'Please try again.',
                    confirmButtonText: 'OK'
                });
            }
        },
        error: function (xhr) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Try again.'
            });
        }
    })
}