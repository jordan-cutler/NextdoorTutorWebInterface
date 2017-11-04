/// <reference path="User.ts" />
/// <reference path="CoursesToTutor.ts" />
/// <reference path="CoursesWithTutors.ts" />
/// <reference path="Profile.ts" />

class Navbar {

    private static readonly NAME = "Navbar";

    public static init(user: any) {
        if (user != null) {
            // TODO (alam): Only pass in the user's first name, this way we say Welcome, Jordan. Instead of Welcome, Jordan Alam. Make sure you update the hb file to handle the change.
            $("#indexNav").html(Handlebars.templates[Navbar.NAME + ".hb"]({
                user: user
            }));

            $("#" + Navbar.NAME + "-signOutButton").click(Navbar.onLogoutClick);
            $("#" + Navbar.NAME + "-tutorAClassButton").click(Navbar.onTutorAClassClick);
            $("#" + Navbar.NAME + "-logo").click(Navbar.onHomeClick);
            $("#" + Navbar.NAME + "-findATutorButton").click(Navbar.onHomeClick);
            $("#" + Navbar.NAME + "-profileButton").click(Navbar.onProfileClick);
        }
        else {
            $("#indexNav").html(Handlebars.templates[Navbar.NAME + ".hb"]({}));
        }
    }

    public static onLogoutClick() {
        Login.logout();
    }

    public static onTutorAClassClick() {
        CoursesToTutor.init();
    }

    public static onHomeClick() {
        CoursesWithTutors.init();
    }

    public static onProfileClick() {
        Profile.init();
    }

}