/// <reference path="ts/Navbar.ts" />
/// <reference path="ts/Login.ts" />

$(document).ready(function () {
    Login.init();
});

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        Login.init();
    });
}