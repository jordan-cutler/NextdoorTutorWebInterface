/// <reference path="TutorApiUtil.ts" />
/// <reference path="CourseApiUtil.ts" />
/// <reference path="Grade.ts" />

class TutorApplication {
    private static readonly NAME = "TutorApplication";

    private static readonly SubmitApplicationButtonSelector = "#" + TutorApplication.NAME + "-submit";
    private static readonly CoursesDropDownSelector = "#" + TutorApplication.NAME + "-course";
    private static readonly HasTakenCourseCheckboxSelector = "#" + TutorApplication.NAME + "-hasTakenCourseSwitch";
    private static readonly CoursesDropDownSelectedSelector = TutorApplication.CoursesDropDownSelector + " option:selected";
    private static readonly GradeDropdownSelector = "#" + TutorApplication.NAME + "-grade";
    private static readonly GradeDropdownSelectedSelector = TutorApplication.GradeDropdownSelector + " option:selected";
    private static readonly InstructorInputSelector = "#" + TutorApplication.NAME + "-instructor";
    private static readonly PastExperienceInputSelector = "#" + TutorApplication.NAME + "-pastExperience";
    private static readonly OtherNotesInputSelector = "#" + TutorApplication.NAME + "-notes";

    private static readonly GradeRowSelector = "#" + TutorApplication.NAME + "-gradeRow";
    private static readonly InstructorRowSelector = "#" + TutorApplication.NAME + "-instructorRow";

    public static init() {
        CourseApiUtil.getCoursesCurrentUserHasntTutoredBefore(
            TutorApplication.onGetCoursesUserHasntTutoredBeforeSuccess,
            function (data: any) {
                window.alert("Failed to retrieve courses available for tutoring.");
            }
        );
    }

    private static onGetCoursesUserHasntTutoredBeforeSuccess(data: any) {
        let courses = Course.CourseJsonArrayToCourseModelArray(data);
        TutorApplication.displayApplication(courses);
        TutorApplication.setEventHandlers();
    }

    private static displayApplication(courses: Course[]) {
        $("#indexMain").html(Handlebars.templates[TutorApplication.NAME + ".hb"]({
            courses: courses,
            grades: Grade.VALID_GRADES
        }));
        TutorApplication.setSelectedItemOnGradeDropdown("B+");
    }

    private static submitApplication() {
        let userId: string = UserSession.userId();
        let sessionToken: string = UserSession.sessionToken();
        let hourlyRate: number = Number($("#hourlyRate").val());
        let courseNumber: string = $(TutorApplication.CoursesDropDownSelectedSelector).text().split(" ")[0];
        if (TutorApplication.courseNotSelected(courseNumber)) {
            Materialize.toast("Select a class to tutor before submitting.", 3000);
            return;
        }
        let pastExperience: string = $(TutorApplication.PastExperienceInputSelector).val();
        let notes: string = $(TutorApplication.OtherNotesInputSelector).val();

        let grade: string = "";
        let instructor: string = "";

        if (TutorApplication.userHasTakenClassBefore()) {
            grade = $(TutorApplication.GradeDropdownSelectedSelector).text();
            instructor = $(TutorApplication.InstructorInputSelector).val();
            if (TutorApplication.gradeNotSelected(grade)) {
                Materialize.toast("Let us know your grade before submitting", 3000);
                return;
            }
            if (!Grade.isGradeValid(grade)) {
                Materialize.toast("Grade is invalid", 3000);
                return;
            }

            if (TutorApplication.instructorNotSelected(instructor)) {
                Materialize.toast("Let us know who your professor was before submitting.", 3000);
                return;
            }
        }

        TutorApiUtil.addTutor(userId, hourlyRate, courseNumber, grade, instructor, pastExperience, notes, sessionToken,
            function (data: any) {
                Materialize.toast("Thanks for becoming a " + courseNumber + " tutor!", 3000);
                setTimeout(CoursesWithTutors.init(), 100)
            },
            function(data: any) {
                Materialize.toast("Could not sign you up at the moment. Please try again later.", 3000);
            }
        );
    }

    private static courseNotSelected(courseNumber: string) {
        return courseNumber == "N/A" || courseNumber == null;
    }

    private static gradeNotSelected(grade: string) {
        return grade == "" || grade == null;
    }

    private static instructorNotSelected(instructor: string) {
        return instructor == "" || instructor == null;
    }

    private static enableHasTakenClassSwitch() {
        $(TutorApplication.HasTakenCourseCheckboxSelector).prop("disabled", false);
    }

    private static userHasTakenClassBefore() {
        return $(TutorApplication.HasTakenCourseCheckboxSelector).is(":checked");
    }

    private static hideOrShowTakenCourseInputs() {
        if (TutorApplication.userHasTakenClassBefore()) {
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

    private static setSelectedItemOnGradeDropdown(grade: string) {
        $(TutorApplication.GradeDropdownSelector).val(grade);
    }
}