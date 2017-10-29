class TransitionsHelper {
    // All use hide / show except Login, since app.ts wants to start off by opening Login. Login uses hide / refresh
    // I know this is poor design but it works for now

    // TODO: Need some function that allows us to pass the hide function NOT TO CALL of all the singletons.

    public static logOut() {
        Constants.setUserId("");
        Constants.setUserToken("");
        TransitionsHelper.openLoginPage();
    }

    // For all the methods that start with "open", you need to hide all other singletons and single out and show the one you want to appear.

    public static openLoginPage() {
        Navbar.hide();
        // Not entirely sure why we need to wait, but without it, you'll have to hit the sign out button twice, or once then refresh the page.
        let millisecondsToWait = 100;
        setTimeout(function() {
            Login.refresh();
            // For some reason we need to call getAuthInstance once the button is present on the screen, which would happen after we reload the login page.
            // TODO: sometimes when we hit the sign out button, it shows us the login screen but then logs us back in again because auth2 is undefined. Need to make it so we actually sign out every time the sign out button is hit.
            gapi.auth2.getAuthInstance().signOut();
        }, millisecondsToWait);
    }

    public static openMainPage() {
        Login.hide();
        Navbar.show();
    }
}
