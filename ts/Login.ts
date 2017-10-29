/// <reference path="Constants.ts" />
/// <reference path="HttpRequestUtil.ts" />
/// <reference path="TransitionsHelper.ts" />
import GoogleUser = gapi.auth2.GoogleUser;

class Login {
    /**
     * The name of the DOM entry associated with Login
     */
    private static readonly NAME = "Login";
    private static readonly SIGNINROUTE = "/user/loginWithGoogle";
    private static readonly SILENTLOGINROUTE = "/user/silentLogin";

    public static hide() {
        $("#" + Login.NAME).remove();
    }

    private static onSignIn(googleUser: GoogleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // send this to backend, and get an ok response saying it was verified.
        let idToken = googleUser.getAuthResponse().id_token;
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        HttpRequestUtil.PostRequest(Login.SIGNINROUTE, { token: idToken },
            Login.onSignInBackendResponseSuccess, Login.onSignInBackendResponseError);
    }

    private static onSignInBackendResponseSuccess(data: any) {
        console.log("Hello, " + data.name);
        console.log("Your email is " + data.email);
        console.log("Your profile photo is " + data.profilePhoto);

        Constants.setUserId(data.userId);
        Constants.setUserToken(data.sessionToken);
        TransitionsHelper.openMainPage();
    }

    private static onSignInBackendResponseError(data: any) {
        window.alert("error when verifying you " + JSON.stringify(data));
        gapi.auth2.getAuthInstance().signOut();
    }

    public static refresh() {
        Login.hide();

        HttpRequestUtil.PostRequest(Login.SILENTLOGINROUTE, { token: Constants.getUserToken(), user_id: Constants.getUserId() },
            TransitionsHelper.openMainPage, Login.show);
    }

    public static show() {
        $("body").append(Handlebars.templates[Login.NAME + ".hb"]({}));
        if (gapi == undefined) {
            gapi.load('auth2', initGoogleApi)
        }
        gapi.signin2.render('googleSignIn', {onsuccess: Login.onSignIn});
    }
}