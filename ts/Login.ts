/// <reference path="Constants.ts" />
import GoogleUser = gapi.auth2.GoogleUser;

class Login {
    /**
     * The name of the DOM entry associated with Login
     */
    private static readonly NAME = "Login";

    /**
     * Track if the Singleton has been initialized
     */
    private static isInit = false;

    /**
    * Initialize the Login singleton.  
    * This needs to be called from any public static method, to ensure that the 
    * Singleton is initialized before use.
    */
    private static init() {
        if (!Login.isInit) {
            Login.isInit = true;
        }
    }

    private static onSignIn(googleUser: GoogleUser) {
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        // send this to backend, and get an ok response saying it was verified.
        let idToken = googleUser.getAuthResponse().id_token;
        console.log("ID token: " + idToken);
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        $.ajax({
            type: "POST",
            url: Constants.APPLICATIONURL + "/user/loginWithGoogle",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ token: idToken }),
            success: Login.onSignInBackendResponseSuccess,
            error: Login.onSignInBackendResponseError
        });
    }

    private static onSignInBackendResponseSuccess(data: any) {
        Constants.setUserId(data.userId);
        Constants.setUserToken(data.idToken);
        Login.moveToPageAfterLogin();
    }

    private static onSignInBackendResponseError(data: any) {
        window.alert("error when verifying you " + JSON.stringify(data));
        gapi.auth2.getAuthInstance().signOut();
    }

    public static refresh() {
        // Make sure the singleton is initialized
        Login.init();

        // TODO: Check silent login route. If logged in, move to page after login. If not, show login screen.
        Login.show();
    }

    public static show() {
        $("body").append(Handlebars.templates[Login.NAME + ".hb"]({}));
        gapi.signin2.render('googleSignIn', {onsuccess: Login.onSignIn});
    }

    public static moveToPageAfterLogin() {
        Login.removePageElements();
        Navbar.show();
    }

    private static removePageElements() {
        $("#" + Login.NAME).remove();
        $("#" + Login.NAME + "-navbar").remove();
        $("#" + Login.NAME + "-fullscreen_bg").remove();
    }
}