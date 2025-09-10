// Grab DOM elements
let btnVerify = $("#verifyOtp");
let resendOtp = $("#resendLink");
let txtOtp = $("#otp");
let email = localStorage.getItem("email");

// =====================
// Resend OTP
// =====================
resendOtp.on("click", function (e) {
    e.preventDefault();
    resendOtp.prop("disabled", true); // disable button while request is running
    sendEmail(email);
});

function sendEmail(email) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/SendMail",
        dataType: "json",
        contentType: "application/json",
        data: email,
        success: function (data) {
            Swal.close();
            resendOtp.prop("disabled", false); // re-enable button

            Swal.fire({
                icon: data.data ? "success" : "error",
                title: data.data ? "Mail Sent!" : "Mail Failed!",
                text: data.data ? "OTP has been sent to your email." : "Something went wrong.",
                confirmButtonText: "OK"
            });
        },
        error: function (xhr) {
            Swal.close();
            resendOtp.prop("disabled", false);

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
                icon: "error",
                title: "Error",
                text: errorMsg
            });
        }
    });
}

// =====================
// Verify OTP
// =====================
btnVerify.on("click", function (e) {
    e.preventDefault();
    let otp = txtOtp.val().trim();

    if (otp === "") {
        Swal.fire({
            icon: "warning",
            title: "OTP Required",
            text: "Please enter the OTP sent to your email.",
            confirmButtonText: "OK"
        });
        return;
    }

    btnVerify.prop("disabled", true); // disable verify button during request
    verifyOtp(otp, email);
});

function verifyOtp(otp, email) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/Verify?otp=" + otp,
        contentType: "application/json",
        dataType: "json",
        data: email,
        success: function (data) {
            btnVerify.prop("disabled", false); // re-enable button

            if (data.data) {
                Swal.fire({
                    icon: "success",
                    title: "OTP Verified!",
                    text: "You will be redirected shortly.",
                    confirmButtonText: "OK"
                }).then(() => {
                    window.location.href = "new-password.html"; // redirect after verification
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Invalid OTP",
                    text: "Please try again.",
                    confirmButtonText: "OK"
                });
            }
        },
        error: function (xhr) {
            btnVerify.prop("disabled", false);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Try again."
            });
        }
    });
}
