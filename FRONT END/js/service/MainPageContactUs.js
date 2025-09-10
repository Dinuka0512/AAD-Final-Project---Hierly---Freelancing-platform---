let btnSendMessage = $("#sendMessage");

btnSendMessage.on("click", function (event) {
    event.preventDefault(); // stop form refresh if button is inside a form

    let txtFirstName = $("#FirstName").val();
    let txtLastName = $("#LastName").val();
    let txtEmail = $("#Email").val();
    let txtSubject = $("#Subject").val();
    let txtMessage = $("#Message").val();

    let date = new Date();
    let formattedDateTime = date.toLocaleString(); // "9/11/2025, 12:45:33 AM"

    emailjs.send("service_vf7nsuk", "template_z6h4cmn", {
        subject: txtSubject,
        name: txtFirstName + " " + txtLastName,
        time: formattedDateTime,
        message: txtMessage,
        email: txtEmail,
    }).then(() => {
        Swal.fire({
            icon: "success",
            title: "Email Sent!",
            html: `
                <b>Email:</b> ${txtEmail}<br>
                <b>Time:</b> ${formattedDateTime}
            `,
            confirmButtonText: "OK"
        });
    }).catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email sending failed. Please try again!",
            footer: error.text || error
        });
    });
});
