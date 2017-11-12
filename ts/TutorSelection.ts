/// <reference path="Tutor.ts" />
/// <reference path="TutorView.ts" />
/// <reference path="ImageUtil.ts" />

class TutorSelection {

    private static readonly NAME = "TutorSelection";
    private static readonly GETUTORSFORCOURSEROUTE = "/api/tutors/course";
    private static tutors: Tutor[];

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
        TutorSelection.handlebarsAddIfAll();
        $("#CoursesWithTutors-TutorList").html(Handlebars.templates[TutorSelection.NAME + ".hb"]({
            tutors: TutorSelection.getTutors(),
            courseNumber: courseNumber
        }));
        $("." + TutorSelection.NAME + "-bookTutorButton").click(TutorSelection.bookTutor);
        let imageClassSelector = "." + TutorSelection.NAME + "-profileImg";
        $(imageClassSelector).hide();
        $('.collapsible').collapsible();
        $('.TutorSelection-profileImg').each(function (index: number, elem: any) {
            $(elem).attr("src",
                ImageUtil.getNewProfilePhotoUrl($(elem).data("tutor_id"), User.sessionToken(), User.userId())
            );
        });
        ImageUtil.hideImagesUntilLoaded("." + TutorSelection.NAME + "-imagePreloader", imageClassSelector);
    }

    private static bookTutor() {

    }

    private static onGetTutorsForCourseError(data: any) {

    }

    private static setTutors(tutors: Tutor[]) {
        TutorSelection.tutors = tutors;
    }

    private static getTutors() {
        return TutorSelection.tutors;
    }

    private static handlebarsAddIfAll() {
        Handlebars.registerHelper('if_all', function () {
            let args = [].slice.apply(arguments);
            let opts = args.pop();

            let fn = opts.fn;
            for (let i = 0; i < args.length; ++i) {
                if (args[i])
                    continue;
                fn = opts.inverse;
                break;
            }
            return fn(this);
        });
    }

}