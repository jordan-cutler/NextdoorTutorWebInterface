/// <reference path="TransitionsHelper.ts" />

/**
 * The Navbar Singleton is the navigation bar at the top of the page.  Through 
 * its HTML, it is designed so that clicking the "brand" part will refresh the
 * page.
 */

class Navbar {
    /**
     * Track if the Singleton has been initialized
     */
    private static isInit = false;

    /**
     * The name of the DOM entry associated with Navbar
     */
    private static readonly NAME = "Navbar";

    private static init() {
        if (!Navbar.isInit) {
            Navbar.isInit = true;
        }
    }

    public static hide() {
        $("#" + Navbar.NAME).remove();
    }

    public static refresh() {
        Navbar.init();
    }

    public static show() {
        $("body").prepend(Handlebars.templates[Navbar.NAME + ".hb"]({}));
        $("#Login-signOutButton").click(TransitionsHelper.logOut);
    }
}