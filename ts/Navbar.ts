/// <reference path="User.ts" />

class Navbar {

    private static readonly NAME = "Navbar";

    public static init(user: any) {
        if (user != null) {
            // TODO (alam): Only pass in the user's first name, this way we say Welcome, Jordan. Instead of Welcome, Jordan Alam. Make sure you update the hb file to handle the change.
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