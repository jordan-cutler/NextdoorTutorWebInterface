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
        // TODO: When we figure out what the next thing we want to show is, we'll probably call some [NextPageName].init, but for now we're just setting the html to empty
        $("#indexMain").html("");
    }

    private static onSignInBackendResponseError(data: any) {
        // TODO: Change this to some nice error message that says something like.. "Something went wrong, try logging in again"
        // To do this, pass some data to signOut, which then gets passed to Login.init and passes that to the handlebars template.
        // Currently the handlebars template does not support taking any data, but that's what we need to add.. the ability to pass an object with the field "alert"
        window.alert("error when verifying you " + JSON.stringify(data));
        signOut(null/* insert some data here when you update handlebars template */);
    }

    public static init(data: any) {
        Navbar.init(null);
        /*
        TODO: Uncomment when you update the handlebars template to show this data. Also delete the other $("#indexMain").html line below the commented portion.
         $("#indexMain").html(Handlebars.templates['login.hb']({
            alert: data
         }));
         */
        $("#indexMain").html(Handlebars.templates[Login.NAME + ".hb"]({}));
        gapi.signin2.render('googleSignIn', { onsuccess: Login.onSignIn });
    }

    public static logout() {
        HttpRequestUtil.PostRequest(Login.SIGNOUTROUTE,
            { userId: User.userId(), sessionToken: User.sessionToken() },
            HttpRequestUtil.EMPTYFUNCTION, HttpRequestUtil.EMPTYFUNCTION);
        // THIS LINE MUST COME AFTER THE POST REQUEST TO SIGN OUT
        User.destroyUser();
        signOut(null);
    }

}