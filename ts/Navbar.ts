/// <reference path="User.ts" />

class Navbar {

    private static readonly NAME = "Navbar";

    public static init(user: any) {
        if (user != null) {
            $("#indexNav").html(Handlebars.templates[Navbar.NAME + ".hb"]({
                user: user
            }));

            $("#" + Navbar.NAME + "-signOutButton").click(Navbar.onLogoutClick);
        }
        else {
            $("#indexNav").html(Handlebars.templates[Navbar.NAME + ".hb"]({}));
        }
    }

    public static onLogoutClick() {
        Login.logout();
    }

}