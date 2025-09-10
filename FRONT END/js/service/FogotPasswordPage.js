// DOM elements
var sendOtp = $("#resetPassword");
var txtEmail = $("#email");

sendOtp.on("click", function () {
    // Disable button to prevent multiple clicks
    sendOtp.prop("disabled", true);

    // Show loading spinner
    Swal.fire({
        title: 'Sending OTP...',
        text: 'Please wait while we send the email.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Call backend
    sendEmail();

});

function sendEmail(){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/SendMail",
        dataType: "json",
        contentType: "application/json",
        data: txtEmail.val(),
        success: function (data) {
            Swal.close();
            sendOtp.prop("disabled", false);

            // Show success/error alert
            Swal.fire({
                icon: data.data ? "success" : "error",
                title: data.data ? "Mail Sent!" : "Mail Failed!",
                text: data.data ? "OTP has been sent to your email." : "Something went wrong.",
                confirmButtonText: "OK"
            }).then(() => {
                if (data.data) {
                    // ✅ Navigate after pressing OK
                    window.location.href = "otp-verification.html";
                }
            });
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