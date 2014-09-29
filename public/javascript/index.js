$(document).ready(function() { 

    // toggle between logging in and registering for a new account
    $('#toggle-login').click(function () {
        // make a new account
        if ($('#toggle-login').is(':checked')) {
            var nameInput = "<input type='text' class='form-control' name='name' placeholder='Enter name' required autofocus>"
            $("form").get(0).setAttribute('action', '/register');
            $("input[name='email']").before(nameInput);
            $("input[type=submit]").val("Register");
        } else {
            // just login
            $("form").get(0).setAttribute('action', '/login');
            $("input[name='name']").remove();
            $("input[type=submit]").val("Login");
        }
    });
});