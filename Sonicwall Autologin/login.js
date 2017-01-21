// login.js

$(document).ready(function () {

    var username = null;
    var password = null;

    getCredentials(function (creds) {

        if ((creds.username == null) || (creds.password == null)) {

            $("form").submit(function () {

                username = $("#fName").val();
                password = $("#lName").val();

                saveCredentials(username, password);
                window.location.replace("https://www.google.com");
                return false;

            });
            $("form").submit();

        } else {

            $("#fName")[0].value = creds.username;
            $("#lName")[0].value = creds.password;

            $("form").submit(function () {
                
                window.location.replace("https://www.google.com");
                return false;

            });
            $("form").submit();
        }
    });

});

function saveCredentials(username, password) {
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'username': username, 'password': password }, function () {
        console.log('Credentials saved');
    });
}

function getCredentials(callback) {
    chrome.storage.sync.get(['username', 'password'], function (data) {
        // Get Credentials from chrome storage
        callback(data)
    });
}