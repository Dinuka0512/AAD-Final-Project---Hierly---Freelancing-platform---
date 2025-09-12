let token = localStorage.getItem("key");

$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/TemplateUser/load',
    dataType: 'json',
    headers: {"Authorization": `Bearer ${token}`},
    contentType: 'application/json',
    success: function (data) {
        console.log(data);
    },
    error: function (data) {
        console.log(data);
    }
})