/// <reference path="HttpRequestUtil.ts" />
/// <reference path="User.ts" />

import GoogleUser = gapi.auth2.GoogleUser;

class Login {
    /**
     * The userName of the DOM entry associated with Login
     */
    private static readonly NAME = "Login";
    private static readonly SIGNINROUTE = "/user/loginWithGoogle";

    private static onSignIn(googleUser: GoogleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // send this to backend, and get an ok response saying it was verified.
        let idToken = googleUser.getAuthResponse().id_token;
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        HttpRequestUtil.PostRequest(Login.SIGNINROUTE, { idToken: idToken },
            Login.onSignInBackendResponseSuccess, Login.onSignInBackendResponseError);
    }

    private static onSignInBackendResponseSuccess(data: any) {
        let user = User.getUser();
        user.email = data.email;
        user.userName = data.name;
        user.user_id = data.userId;
        user.sessionToken = data.sessionToken;
        user.profilePhotoUrl = data.profilePhotoUrl;
        Navbar.init(user);
        $("#indexMain").html("");
    }

    private static onSignInBackendResponseError(data: any) {
        window.alert("error when verifying you " + JSON.stringify(data));
        signOut();
    }

    public static init() {
        Navbar.init(null);
        $("#indexMain").html(Handlebars.templates[Login.NAME + ".hb"]({}));
        gapi.signin2.render('googleSignIn', { onsuccess: Login.onSignIn });
    }

    public static logout() {
        User.destroyUser();
        signOut();
    }

}