class TutorApplication {
    private static readonly NAME = "TutorApplication";
    private static readonly ADDTUTORROUTE = "/api/tutors/add";
    private static readonly COURSESUSERHASNTTUTOREDBEFOREROUTE = "/api/courses/notTutoring";
    private static readonly SubmitApplicationButtonSelector = "#" + TutorApplication.NAME + "-submit";
    private static readonly CoursesDropDownSelector = "#" + TutorApplication.NAME + "-course";
    private static readonly HasTakenCourseCheckboxSelector = "#" + TutorApplication.NAME + "-hasTakenCourseSwitch";
    private static readonly CoursesDropDownSelectedSelector = TutorApplication.CoursesDropDownSelector + " option:selected";
    private static readonly GradeDropdownSelectedSelector = "#" + TutorApplication.NAME + "-grade option:selected";
    private static readonly InstructorInputSelector = "#" + TutorApplication.NAME + "-instructor";
    private static readonly PastExperienceInputSelector = "#" + TutorApplication.NAME + "-pastExperience";
    private static readonly OtherNotesInputSelector = "#" + TutorApplication.NAME + "-notes";

    private static readonly GradeRowSelector = "#" + TutorApplication.NAME + "-gradeRow";
    private static readonly InstructorRowSelector = "#" + TutorApplication.NAME + "-instructorRow";

    public static init() {
        HttpRequestUtil.GetRequest(TutorApplication.COURSESUSERHASNTTUTOREDBEFOREROUTE + "/" + User.userId(),
            HttpRequestUtil.getSessionInfoJson(),
            TutorApplication.onGetCoursesUserHasntTutoredBeforeSuccess,
            function(data: any) {
                window.alert("Failed to retrieve courses available for tutoring.");
            }
        )
    }

    private static onGetCoursesUserHasntTutoredBeforeSuccess(data: any) {
        let courses = Course.CourseJsonArrayToCourseModelArray(data);
        TutorApplication.displayApplication(courses);
        TutorApplication.setEventHandlers();
    }

    private static displayApplication(courses: Course[]) {
        $("#indexMain").html(Handlebars.templates[TutorApplication.NAME + ".hb"]({
            courses: courses
        }));
    }

    private static submitApplication() {
        let userId: string = User.userId();
        let sessionToken: string = User.sessionToken();
        let hourlyRate: number = Number($("#hourlyRate").val());
        let courseNumber: string = $(TutorApplication.CoursesDropDownSelectedSelector).text();
        if (courseNumber == "N/A") {
            Materialize.toast("Please select a class to tutor before submitting.", 2000);
            return;
        }
        let grade: string = $(TutorApplication.GradeDropdownSelectedSelector).text();
        let instructor: string = $(TutorApplication.InstructorInputSelector).val();
        let pastExperience: string = $(TutorApplication.PastExperienceInputSelector).val();
        let notes: string = $(TutorApplication.OtherNotesInputSelector).val();

        let tutorData = {
            userId: userId,
            hourlyRate: hourlyRate,
            courseNumber: courseNumber,
            grade: grade,
            instructor: instructor,
            pastExperience: pastExperience,
            notes: notes,
            sessionToken: sessionToken
        };

        HttpRequestUtil.PostRequest(TutorApplication.ADDTUTORROUTE, tutorData,
            TutorApplication.onSubmitApplicationSuccess, TutorApplication.onSubmitApplicationError);
    }

    private static onSubmitApplicationSuccess(data: any) {
        console.log("success");
        console.log(data);
    }

    private static onSubmitApplicationError(data: any) {
        console.log("error");
        console.log(data);
    }

    private static enableHasTakenClassSwitch() {
        $(TutorApplication.HasTakenCourseCheckboxSelector).prop("disabled", false);
    }

    private static hideOrShowTakenCourseInputs() {
        if ($(this).is(':checked')) {
            TutorApplication.showTakenCourseInputs();
        } else {
            TutorApplication.hideTakenCourseInputs();
        }
    }

    private static showTakenCourseInputs() {
        $(TutorApplication.GradeRowSelector).show();
        $(TutorApplication.InstructorRowSelector).show();
    }

    private static hideTakenCourseInputs() {
        $(TutorApplication.GradeRowSelector).hide();
        $(TutorApplication.InstructorRowSelector).hide();
    }

    private static setEventHandlers() {
        $('select').material_select();
        $('input.character-count').characterCounter();
        $(TutorApplication.SubmitApplicationButtonSelector).click(TutorApplication.submitApplication);
        $(TutorApplication.CoursesDropDownSelector).change(TutorApplication.enableHasTakenClassSwitch);
        $(TutorApplication.HasTakenCourseCheckboxSelector).change(TutorApplication.hideOrShowTakenCourseInputs);
    }
}