class TutorView {

    private static readonly NAME = "TutorView";

    public static init(tutor: Tutor) {
        $("#indexMain").html(Handlebars.templates[TutorView.NAME + ".hb"]({
            tutor: tutor
        }));
    }
}