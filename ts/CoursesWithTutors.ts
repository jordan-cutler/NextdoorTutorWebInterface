/// <reference path="Course.ts" />
/// <reference path="TutorSelection.ts" />

class CoursesWithTutors {

    private static readonly NAME = "CoursesWithTutors";
    private static readonly COURSESWITHTUTORSROUTE = "/api/courses/haveTutors";
    public static init() {
        HttpRequestUtil.GetRequest(CoursesWithTutors.COURSESWITHTUTORSROUTE, HttpRequestUtil.getSessionInfoJson(),
            function(data: any) {
                let courses = Course.CourseJsonArrayToCourseModelArray(data);
                CoursesWithTutors.setHandlebarsTemplate(courses);
            },
            function(data: any) {
                window.alert("Failed to retrieve courses with tutors. Please refresh the page and try again.");
            }
        )
    }

    private static setHandlebarsTemplate(courses: Course[]) {
        $("#indexMain").html(Handlebars.templates[CoursesWithTutors.NAME + ".hb"]({}));
        let searchObj = { };
        courses.forEach(function(course: Course) {
             searchObj[course.courseNumber + " " + course.title] = null;
        });
        $("#" + CoursesWithTutors.NAME + "-search").autocomplete({
            data: searchObj,
            limit: 15, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(course) {
                let courseNumber = course.split(" ")[0];
                TutorSelection.init(courseNumber);
                // Callback function when value is autocompleted.
            },
            minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
        $("." + CoursesWithTutors.NAME + "-clickToGoToTutorSelection").click(CoursesWithTutors.clickCourse);
    }

    private static clickCourse() {
        let courseNumber: string = $(this).data("course_number");
        TutorSelection.init(courseNumber);
    }
}