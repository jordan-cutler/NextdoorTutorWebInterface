/// <reference path="ts/Navbar.ts" />
/// <reference path="ts/Login.ts" />
/// <reference path="ts/CoursesWithTutors.ts" />

$(document).ready(function () {
    Login.init(null);
});

function signOut(data: any) {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        Login.init(data);
    });
}