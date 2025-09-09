// DOM elements
var sendOtp = $("#resetPassword");
var txtEmail = $("#email");

sendOtp.on("click", function () {
    // Disable button to prevent multiple clicks
    sendOtp.prop("disabled", true);

    // Show loading spinner
    Swal.fire({
        title: 'Checking user...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/IsUserExist",
        dataType: "json",
        contentType: "application/json",
        data: txtEmail.val(),
        success: function (data) {
            Swal.close();
            sendOtp.prop("disabled", false);

            console.log(data);
            if(data.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Found',
                    text: 'OTP has been sent to your email.',
                    showConfirmButton: true
                });

                //HERE NEED TO SEND THE GMAIL

                window.location.href = "otp-verification.html";
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'User Not Found',
                    text: 'Email is Not Found.'
                });
            }


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
    });
});