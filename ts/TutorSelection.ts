/// <reference path="Tutor.ts" />
/// <reference path="ImageUtil.ts" />
/// <reference path="TutorApiUtil.ts" />

class TutorSelection {

    private static readonly NAME = "TutorSelection";

    private static tutors: Tutor[];

    private static readonly ProfileImagesSelector = "." + TutorSelection.NAME + "-profileImg";
    private static readonly BookTutorButtonSelector = "#" + TutorSelection.NAME + "-bookTutorButton";
    private static readonly ImagePreloadersSelector = "." + TutorSelection.NAME + "-preloader";

    public static init(courseNumber: string) {
        TutorApiUtil.getTutorsForCourse(
            courseNumber,
            function (data: any) {
                TutorSelection.showTutors(data, courseNumber);
            },
            TutorSelection.onGetTutorsForCourseError
        );
    }

    private static showTutors(data: any, courseNumber: string) {
        new Clipboard(".btn");
        TutorSelection.setTutors(Tutor.TutorJsonArrayToTutorModel(data));
        TutorSelection.handlebarsAddIfAll(); // Register handlebars function before we add the template
        $("#CoursesWithTutors-TutorList").html(Handlebars.templates[TutorSelection.NAME + ".hb"]({
            tutors: TutorSelection.getTutors(),
            courseNumber: courseNumber
        }));
        TutorSelection.setImageSrcAttributesForProfilePictures();
        ImageUtil.hideImagesUntilLoaded(TutorSelection.ImagePreloadersSelector, TutorSelection.ProfileImagesSelector);
        TutorSelection.setEventHandlers();
    }

    private static onGetTutorsForCourseError(data: any) {

    }

    private static setImageSrcAttributesForProfilePictures() {
        $(TutorSelection.ProfileImagesSelector).each(function (index: number, elem: any) {
            $(elem).attr("src",
                ImageUtil.getNewProfilePhotoUrl($(elem).data("tutor_id"), User.sessionToken(), User.userId())
            );
        });
    }

    private static setEventHandlers() {
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip({delay: 50});
        $(TutorSelection.BookTutorButtonSelector).click(function() {
            Materialize.toast("Email copied!", 2000);
        });
    }

    private static setTutors(tutors: Tutor[]) {
        TutorSelection.tutors = tutors;
    }

    private static getTutors() {
        return TutorSelection.tutors;
    }

    // Register handlebars helper to validate multiple fields existing
    private static handlebarsAddIfAll() {
        Handlebars.registerHelper('if_all', function(this: any) {
            let args = [].slice.apply(arguments);
            let opts = args.pop();

            let fn = opts.fn;
            for (let i = 0; i < args.length; i++) {
                if (args[i])
                    continue;
                fn = opts.inverse;
                break;
            }

            return fn(this);
        });
    }

}