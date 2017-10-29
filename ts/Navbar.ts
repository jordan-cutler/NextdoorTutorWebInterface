/// <reference path="User.ts" />

/**
 * The Navbar Singleton is the navigation bar at the top of the page.  Through 
 * its HTML, it is designed so that clicking the "brand" part will refresh the
 * page.
 */

class Navbar {

    /**
     * The userName of the DOM entry associated with Navbar
     */
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