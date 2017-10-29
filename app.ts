/// <reference path="ts/Navbar.ts" />
/// <reference path="ts/Login.ts" />

$(document).ready(function () {
    Login.refresh();
});

function initGoogleApi() {
    gapi.auth2.init({
        client_id: "66818467629-8egqjjtg6obnmqbhgfu13qob5he5k4l5.apps.googleusercontent.com"
    });
}