/// <reference path="HttpRequestUtil.ts" />
/// <reference path="User.ts" />

import GoogleUser = gapi.auth2.GoogleUser;

class Login {

    private static readonly NAME = "Login";
    private static readonly SIGNINROUTE = "/user/loginWithGoogle";
    private static readonly SIGNOUTROUTE = "/user/logout";

    public static init(data: any) {
        Navbar.init(null);
        $("#indexMain").html(Handlebars.templates[Login.NAME + ".hb"](data));
        gapi.signin2.render('googleSignIn', {onsuccess: Login.onSignIn});
    }

    private static onSignIn(googleUser: GoogleUser) {
        let idToken = googleUser.getAuthResponse().id_token;
        /**
         * TODO multi-line
         * Right now, cant figure out how to fix this issue where when you sign in with a non lehigh domain,
         * then we sign you out, and you click the button, it automatically picks that same account and signs you
         * in again, putting you in an infinite loop and locking you out
         */

        /*if (googleUser.getHostedDomain() != "lehigh.edu") {
            signOut(null);
            //Materialize.toast("Please ensure you sign in using an @lehigh.edu domain", 4000, 'rounded');
        }*/
        // send this to backend, and get an ok response saying it was verified.
        HttpRequestUtil.PostRequest(Login.SIGNINROUTE, {idToken: idToken},
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
        signOut({ alert: "Error occurred when signing you in. Please refresh and try again. Make sure to use an @lehigh.edu domain."});
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