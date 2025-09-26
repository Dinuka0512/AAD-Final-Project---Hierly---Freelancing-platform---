import Validation from "../util/Validations.js";
let token = localStorage.getItem("key");
var topName = $("#clientName");
var displayName = $("#clientPName");
var email = $("#emailDisplay");
var clientAbout = $("#clientAbout");
var clientLocation = $("#profileLocation");
var clientContact = $("#profileContact");

var postedProjectCount = $("#profileProjectsCount");
var totalSpent = $("#profileSpentAmount");
var doneProjectCount = $("#doneProjects");

//SECTION SHOWING
var bioSection = $("#bioSection");
var locationSection = $("#locationSection");
var contactSection = $("#contactSection");

//IMAGE
var topImage = $("#topProfile");
var profileImage = $("#clientAvatarPreview");
var edditSectionImage = $("#clientProfile");

//EDIT SECTION
var txtClientName =  $("#editDisplayName");
var txtAboutCient =  $("#editBio");
var txtLocationClient =  $("#editLocation");
var txtClientContact =  $("#editContact");

//BUTTONS
var btnSave =  $("#publishChanges");
var chooseImage = $("#editAvatarInput");

pageReload();
function pageReload(){
    if(token === null){
        window.location.href = "login.html";
    }
    loadDataFromDatabase();
}

function loadDataFromDatabase(){
    $.ajax({
        type: "GET",
        url:"http://localhost:8080/TemplateUser/getClientData",
        dataType:"json",
        headers: {"Authorization": `Bearer ${token}`},
        success:function(data){
            console.log(data);
            checkIsClientLogin(data);
            setUserData(data);
        },
        error:function(err){
            console.log(err);
        }
    })
}

function checkIsClientLogin(data){
    if(data.data.role === "Client"){
        //OK CLIENT
    }else{
        //FREELANCER OR ADMIN --- LOG TO CLIENT PAGE
        localStorage.setItem("key", ""); // - REMOVE TOKEN
        window.location.href = "login.html";
    }
}

function setUserData(data){
    topName.html(data.data.name);
    displayName.html(data.data.name);
    email.html(data.data.email);

    //BIO SECTION -------------
    if(data.data.bio === null){
        bioSection.hide();
    }else{
        bioSection.show();
        clientAbout.html(data.data.bio);
    }

    //LOCATION SECTION -----------
    if(data.data.location === null){
        locationSection.hide();
    }else{
        locationSection.show();
        clientLocation.html(data.data.location);
    }

    //CONTACT SECTION ------------
    if(data.data.contact === null){
        contactSection.hide();
    }else{
        contactSection.show();
        clientContact.html(data.data.contact);
    }


    //IMAGE SET ---------------------
    if(data.data.profilePicture !== null){
        topImage.attr("src", data.data.profilePicture);
        profileImage.attr("src", data.data.profilePicture);
        edditSectionImage.attr("src", data.data.profilePicture);
    }else{
        topImage.attr("src", "https://res.cloudinary.com/dgokbm0dx/image/upload/v1758830530/Client/fxrkfspq6wlcnhnnrzpj.png");
        profileImage.attr("src", "https://res.cloudinary.com/dgokbm0dx/image/upload/v1758830530/Client/fxrkfspq6wlcnhnnrzpj.png");
        edditSectionImage.attr("src", "https://res.cloudinary.com/dgokbm0dx/image/upload/v1758830530/Client/fxrkfspq6wlcnhnnrzpj.png");
    }


    //HIDE THE DIV WHEN NOTHING HAVE .......
    var detailSection = $("#detailSection");
    if(data.data.bio === null && data.data.location === null && data.data.contact === null){
        detailSection.hide();
    }else{
        detailSection.show();
    }
}


//UPDATE CLIENT
btnSave.on("click", function(){
    var name = txtClientName.val();
    var about = txtAboutCient.val();
    var location = txtLocationClient.val();
    var contact = txtClientContact.val();

    if(!Validation.isValidUserName(name)){
        alert("Enter Valid Username!");
        return;
    }

    if(!Validation.isNotNull(location)){
        alert("Enter Location!");
        return;
    }

    if(!Validation.isValidMobileNumber(contact)){
        alert("Enter Valid Contact Number!");
        return;
    }

    if(!Validation.isNotNull(about)){
        alert("Enter About!");
        return;
    }


    $.ajax({
        type: "POST",
        url: "http://localhost:8080/TemplateUser/updateProfile",
        headers: {"Authorization": `Bearer ${token}`},
        data:{
            name: name,
            about: about,
            location: location,
            contact: contact
        },
        success: function(data){
            alert("Updated Profile successfully!");
            pageReload();
        },
        error: function(err){
            console.log(err);
        }
    })
})

//UPDATE IMAGE --- CHOOSE IMAGE
chooseImage.on("change", function(){
    const file = this.files[0];
    if (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {
            const formData = new FormData();
            formData.append("file", file);

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/TemplateUser/uploadClientImage",
                headers: { "Authorization": `Bearer ${token}` },
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log("✅ Uploaded:", data);
                    pageReload();  // <- might be wrong function
                },
                error: function (err) {
                    console.error("Upload error:", err);
                }
            });
        } else {
            alert("Please upload only JPG or PNG images!");
        }
    }
})
