/// <reference path="HttpRequestUtil.ts" />
/// <reference path="User.ts" />
/// <reference path="UserApiUtil.ts" />

import GoogleUser = gapi.auth2.GoogleUser;

class Login {

    private static readonly NAME = "Login";

    public static init(data: any) {
        $("#indexMain").html(Handlebars.templates[Login.NAME + ".hb"](data));
        gapi.signin2.render('googleSignIn', {onsuccess: Login.onSignIn});
    }

    private static onSignIn(googleUser: GoogleUser) {
        if (googleUser.getHostedDomain() != "lehigh.edu") {
            signOut(null);
            Materialize.toast("Please ensure you sign in using an @lehigh.edu domain", 4000, 'rounded');
        }
        else {
            let idToken = googleUser.getAuthResponse().id_token;
            UserApiUtil.signInUser(idToken, Login.onSignInBackendResponseSuccess, Login.onSignInBackendResponseError);
        }
    }

    private static onSignInBackendResponseSuccess(data: any) {
        let user = User.getUser();
        let userObjectJson = data.user;
        User.setFields(
            user,
            data.sessionToken,
            userObjectJson.email,
            userObjectJson.name,
            userObjectJson.userId,
            userObjectJson.profilePhotoId,
            userObjectJson.bio
        );
        Navbar.init(user);
        CoursesWithTutors.init();
    }

    private static onSignInBackendResponseError(data: any) {
        signOut({alert: "Error occurred when signing you in. Please refresh and try again. Make sure to use an @lehigh.edu domain."});
    }

    public static logout() {
        UserApiUtil.signOutUser(HttpRequestUtil.EMPTYFUNCTION, HttpRequestUtil.EMPTYFUNCTION);
        // THIS LINE MUST COME AFTER THE POST REQUEST TO SIGN OUT
        $("#indexNav").html("");
        User.destroyUser();
        signOut(null);
    }

}