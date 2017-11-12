/// <reference path="Course.ts" />
/// <reference path="TutorSelection.ts" />

class CoursesWithTutors {

    private static readonly NAME = "CoursesWithTutors";
    private static readonly COURSESWITHTUTORSROUTE = "/api/courses/haveTutors";
    private static readonly SearchBarSelector = "#" + CoursesWithTutors.NAME + "-search";

    public static init() {
        HttpRequestUtil.GetRequest(CoursesWithTutors.COURSESWITHTUTORSROUTE, HttpRequestUtil.getSessionInfoJson(),
            CoursesWithTutors.onGetCoursesWithTutorsSuccess,
            function(data: any) {
                window.alert("Failed to retrieve courses with tutors. Please refresh the page and try again.");
            }
        )
    }

    private static onGetCoursesWithTutorsSuccess(data: any) {
        let courses = Course.CourseJsonArrayToCourseModelArray(data);
        CoursesWithTutors.setHandlebarsTemplate();
        CoursesWithTutors.initializeSearchBar(courses);
    }

    private static setHandlebarsTemplate() {
        $("#indexMain").html(Handlebars.templates[CoursesWithTutors.NAME + ".hb"]({}));
    }

    private static initializeSearchBar(courses: Course[]) {
        let searchObj: object = { }; // will contain the info we pass to autocomplete so we can populate the search bar
        courses.forEach(function(course: Course) {
            CoursesWithTutors.addCourseToSearchObject(course, searchObj);
        });
        $(CoursesWithTutors.SearchBarSelector).autocomplete({
            data: searchObj,
            limit: 15, // The max amount of results that can be shown at once. Default: Infinity.
            // execute when someone clicks a selection
            onAutocomplete: function(course) {
                let courseNumber = course.split(" ")[0];
                CoursesWithTutors.showListOfTutorsForCourseNumber(courseNumber);
            },
            minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
    }

    private static addCourseToSearchObject(course: Course, searchObject: object) {
        searchObject[course.courseNumber + " " + course.title] = null;
    }

    private static showListOfTutorsForCourseNumber(courseNumber: string) {
        TutorSelection.init(courseNumber);
    }
}