/// <reference path="HttpRequestUtil.ts" />
/// <reference path="User.ts" />

import GoogleUser = gapi.auth2.GoogleUser;

class Login {

    private static readonly NAME = "Login";
    private static readonly SIGNINROUTE = "/user/loginWithGoogle";
    private static readonly SIGNOUTROUTE = "/user/logout";

    private static onSignIn(googleUser: GoogleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // send this to backend, and get an ok response saying it was verified.
        let idToken = googleUser.getAuthResponse().id_token;
        console.log('Email: ' + profile.getEmail());

        HttpRequestUtil.PostRequest(Login.SIGNINROUTE, { idToken: idToken },
            Login.onSignInBackendResponseSuccess, Login.onSignInBackendResponseError);
    }

    private static onSignInBackendResponseSuccess(data: any) {
        let user = User.getUser();
        user.email = data.email;
        user.userName = data.name;
        user.userId = data.userId;
        user.sessionToken = data.sessionToken;
        user.profilePhotoUrl = data.profilePhotoUrl;
        Navbar.init(user);
        CoursesWithTutors.init();
    }

    private static onSignInBackendResponseError(data: any) {
        let message = { alert: "There was an error when verifying your login. Please refresh the page and try again. " };
        signOut(message);
    }

    public static init(data: any) {
        Navbar.init(null);
        $("#indexMain").html(Handlebars.templates[Login.NAME + ".hb"](data));
        gapi.signin2.render('googleSignIn', { onsuccess: Login.onSignIn });
    }

    public static logout() {
        HttpRequestUtil.PostRequest(Login.SIGNOUTROUTE,
            HttpRequestUtil.getSessionInfoJson(),
            HttpRequestUtil.EMPTYFUNCTION, HttpRequestUtil.EMPTYFUNCTION);
        // THIS LINE MUST COME AFTER THE POST REQUEST TO SIGN OUT
        User.destroyUser();
        signOut(null);
    }

}