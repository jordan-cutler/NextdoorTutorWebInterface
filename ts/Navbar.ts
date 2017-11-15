/// <reference path="User.ts" />
/// <reference path="TutorApplication.ts" />
/// <reference path="CoursesWithTutors.ts" />
/// <reference path="Profile.ts" />
/// <reference path="Calendar.ts" />

class Navbar {

    private static readonly NAME = "Navbar";
    private static readonly LogoSelector = "#" + Navbar.NAME + "-logo";
    private static readonly SignOutButtonSelector = "." + Navbar.NAME + "-signOutButton";
    private static readonly TutorAClassButtonSelector = "." + Navbar.NAME + "-tutorAClassButton";
    private static readonly FindATutorButtonSelector = "." + Navbar.NAME + "-findATutorButton";
    private static readonly ProfileButtonSelector = "." + Navbar.NAME + "-profileButton";
    private static readonly CalendarButtonSelector = "." + Navbar.NAME + "-calendar";

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
        $(Navbar.CalendarButtonSelector).click(Navbar.onCalendarClick);
        $(".button-collapse").sideNav({
            closeOnClick: true
        });
        $('ul.tabs').tabs();
    }

    private static onLogoutClick() {
        Login.logout();
    }

    private static onTutorAClassClick() {
        TutorApplication.init();
    }

    private static onHomeClick() {
        CoursesWithTutors.init();
    }

    private static onProfileClick() {
        Profile.init();
    }

    private static onCalendarClick() {
        Calendar.init();
    }

}