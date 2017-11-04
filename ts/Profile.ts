class Profile {
    private static readonly NAME = "Profile";

    public static init() {
        //TODO: Also send data about what classes you have tutored for.
        //TODO: Allow user to remove themselves from tutoring for a class
        $("#indexMain").html(Handlebars.templates[Profile.NAME + ".hb"]({
            user: User.getUser()
        }));
    }
}