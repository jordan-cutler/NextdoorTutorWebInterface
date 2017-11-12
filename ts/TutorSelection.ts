/// <reference path="Tutor.ts" />
/// <reference path="ImageUtil.ts" />

class TutorSelection {

    private static readonly NAME = "TutorSelection";
    private static readonly GETUTORSFORCOURSEROUTE = "/api/tutors/course";
    private static tutors: Tutor[];

    private static profileImagesSelector = "." + TutorSelection.NAME + "-profileImg";
    private static imagePreloadersSelector = "." + TutorSelection.NAME + "-imagePreloader";

    public static init(courseNumber: string) {
        HttpRequestUtil.GetRequest(TutorSelection.GETUTORSFORCOURSEROUTE,
            {courseNumber: courseNumber, userId: User.userId(), sessionToken: User.sessionToken()},
            function (data: any) {
                TutorSelection.showTutors(data, courseNumber);
            },
            TutorSelection.onGetTutorsForCourseError
        );
    }

    private static showTutors(data: any, courseNumber: string) {
        TutorSelection.setTutors(Tutor.TutorJsonArrayToTutorModel(data));
        TutorSelection.handlebarsAddIfAll(); // Register handlebars function before we add the template
        $("#CoursesWithTutors-TutorList").html(Handlebars.templates[TutorSelection.NAME + ".hb"]({
            tutors: TutorSelection.getTutors(),
            courseNumber: courseNumber
        }));
        $(TutorSelection.profileImagesSelector).hide();
        TutorSelection.setImageSrcAttributesForProfilePictures();
        ImageUtil.hideImagesUntilLoaded(TutorSelection.imagePreloadersSelector, TutorSelection.profileImagesSelector);
        TutorSelection.setEventHandlers();
    }

    private static onGetTutorsForCourseError(data: any) {

    }

    private static setImageSrcAttributesForProfilePictures() {
        $(TutorSelection.profileImagesSelector).each(function (index: number, elem: any) {
            $(elem).attr("src",
                ImageUtil.getNewProfilePhotoUrl($(elem).data("tutor_id"), User.sessionToken(), User.userId())
            );
        });
    }

    private static setEventHandlers() {
        $('.collapsible').collapsible();
    }

    private static setTutors(tutors: Tutor[]) {
        TutorSelection.tutors = tutors;
    }

    private static getTutors() {
        return TutorSelection.tutors;
    }

    // Register handlebars helper to validate multiple fields existing
    private static handlebarsAddIfAll() {
        Handlebars.registerHelper('if_all', function () {
            let args = [].slice.apply(arguments);
            let opts = args.pop();

            let fn = opts.fn;
            for (let i = 0; i < args.length; i++) {
                if (args[i])
                    continue;
                fn = opts.inverse;
                break;
            }

            //noinspection TypeScriptValidateTypes
            return fn(this);
        });
    }

}