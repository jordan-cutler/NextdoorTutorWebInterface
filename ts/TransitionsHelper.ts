class TransitionsHelper {
    // All use hide / show except Login, since app.ts wants to start off by opening Login. Login uses hide / refresh
    // I know this is poor design but it works for now

    // TODO: Need some function that allows us to pass the hide function NOT TO CALL of all the singletons.

    public static logOut() {
        gapi.auth2.getAuthInstance().signOut();
        Constants.setUserId("");
        Constants.setUserToken("");

        TransitionsHelper.openLoginPage();
    }

    public static openLoginPage() {
        Navbar.hide();
        // Not entirely sure why we need to wait, but without it, you'll have to hit the sign out button twice, or once then refresh the page.
        let millisecondsToWait = 250;
        setTimeout(function() {
            Login.refresh();
        }, millisecondsToWait);
    }

    public static openMainPage() {
        Login.hide();
        Navbar.show();
    }
}
