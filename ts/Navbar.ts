/// <reference path="User.ts" />
/// <reference path="TutorApplication.ts" />
/// <reference path="CoursesWithTutors.ts" />
/// <reference path="Profile.ts" />

class Navbar {

    private static readonly NAME = "Navbar";
    private static readonly LogoSelector = "#" + Navbar.NAME + "-logo";
    private static readonly SignOutButtonSelector = "." + Navbar.NAME + "-signOutButton";
    private static readonly TutorAClassButtonSelector = "." + Navbar.NAME + "-tutorAClassButton";
    private static readonly FindATutorButtonSelector = "." + Navbar.NAME + "-findATutorButton";
    private static readonly ProfileButtonSelector = "." + Navbar.NAME + "-profileButton";

    public static init(user: any) {
        if (user != null) {
            $("#indexNav").html(Handlebars.templates[Navbar.NAME + ".hb"]({
                user: user
            }));
            Navbar.setEventHandlers();
        }
        else {
            $("#indexNav").html(Handlebars.templates[Navbar.NAME + ".hb"]({}));
        }
    }

    private static setEventHandlers() {
        $(Navbar.LogoSelector).click(Navbar.onHomeClick);
        $(Navbar.SignOutButtonSelector).click(Navbar.onLogoutClick);
        $(Navbar.TutorAClassButtonSelector).click(Navbar.onTutorAClassClick);
        $(Navbar.FindATutorButtonSelector).click(Navbar.onHomeClick);
        $(Navbar.ProfileButtonSelector).click(Navbar.onProfileClick);
        $(".button-collapse").sideNav({
            closeOnClick: true
        });
    }

    public static onLogoutClick() {
        Login.logout();
    }

    public static onTutorAClassClick() {
        TutorApplication.init();
    }

    public static onHomeClick() {
        CoursesWithTutors.init();
    }

    public static onProfileClick() {
        Profile.init();
    }

}