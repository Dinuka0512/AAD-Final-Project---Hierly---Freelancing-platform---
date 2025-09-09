// LOGIN PAGE
var txtEmail = $("#email");
var txtPassword = $("#password");
var btnLogin = $("#logIn");

btnLogin.on("click", function (e) {
    e.preventDefault(); // stop form reload

    var user = {
        "email": txtEmail.val(),
        "password": txtPassword.val()
    };

    // Show loading spinner
    Swal.fire({
        title: 'Logging in...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/User/login",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(user),

        success: function (data) {
            Swal.close(); // Close loading spinner

            // 🔹 Handle backend response code (since HTTP is always 200)
            if (data.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: data.message || "Something went wrong!",
                    showConfirmButton: true
                });
                return; // stop here if login failed
            }

            // 🔹 Success: save token/key
            localStorage.setItem("key", data.data);

            let message = data.message || "";
            let role = message.split(" ")[0];
            let redirectTo = "error.html";

            if (role === "Admin") {
                redirectTo = "admin.html";
            } else if (role === "Freelancer") {
                redirectTo = "freelancer-dashboard.html";
            } else if (role === "Client") {
                redirectTo = "client-dashboard.html";
            }

            // 🔹 Show success alert then redirect
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Redirecting to your dashboard...',
                showConfirmButton: true
            }).then(() => {
                window.location.href = redirectTo;
            });
        },

        error: function (xhr) {
            Swal.close(); // Close loading spinner

            // This will only trigger on network errors / CORS issues
            let errorMsg = "Cannot connect to the server. Check your internet.";
            console.error("AJAX error");

            Swal.fire({
                icon: 'error',
                title: 'Connection Error',
                text: errorMsg,
                showConfirmButton: true
            });
        }
    });
});
