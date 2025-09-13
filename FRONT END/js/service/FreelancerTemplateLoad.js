let token = localStorage.getItem("key");
let userName = $("#userName");
let profileName = $("#profileName");
let profileTitle = $("#profileTitle");

$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/TemplateUser/load',
    dataType: 'json',
    headers: {"Authorization": `Bearer ${token}`},
    contentType: 'application/json',
    success: function (data) {
        if(data.data.role === "Freelancer"){
            //FREELANCER DATA LOAD
            freelancersDataLoad(data);
        }else{
            //NOT THE FREELANCER
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Only freelancers can access this page.',
                confirmButtonText: 'OK'
            }).then(() => {
                // optional: redirect after alert
                window.location.href = "login.html";
            });
        }
    },
    error: function (data) {
        console.log(data);
    }
})

function freelancersDataLoad(data) {
    console.log(data);

    userName.html(data.data.name);
    profileName.html(data.data.type);
    profileTitle.html(data.data.title);
}