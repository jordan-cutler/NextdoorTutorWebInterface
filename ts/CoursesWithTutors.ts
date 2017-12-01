/// <reference path="Course.ts" />
/// <reference path="TutorSelection.ts" />
/// <reference path="CourseApiUtil.ts" />

class CoursesWithTutors {

    private static readonly NAME = "CoursesWithTutors";
    private static readonly SearchBarSelector = "#" + CoursesWithTutors.NAME + "-search";

    public static init() {
        CourseApiUtil.getCoursesWithTutors(
            function(data: any) {
                $("#indexMain").html(Handlebars.templates[CoursesWithTutors.NAME + ".hb"]({}));
                let courses = Course.CourseJsonArrayToCourseModelArray(data);
                CoursesWithTutors.initializeSearchBar(courses);
                CoursesWithTutors.setEventHandlers();
            },
            function(data: any) {
                window.alert("Failed to retrieve courses with tutors. Please refresh the page and try again.");
            });
    }

    private static initializeSearchBar(courses: Course[]) {
        let searchObj: any = { }; // will contain the info we pass to autocomplete so we can populate the search bar
        courses.forEach(function(course: Course) {
            CoursesWithTutors.addCourseToSearchObject(course, searchObj);
        });
        $(CoursesWithTutors.SearchBarSelector).autocomplete({
            data: searchObj,
            limit: 15, // The max amount of results that can be shown at once. Default: Infinity.
            // execute when someone clicks a selection
            onAutocomplete: function(course: string) {
                let courseNumber = course.split(" ")[0];
                CoursesWithTutors.showListOfTutorsForCourseNumber(courseNumber);
            },
            minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
    }

    private static addCourseToSearchObject(course: Course, searchObject: any) {
        searchObject[course.toString()] = null;
    }

    private static showListOfTutorsForCourseNumber(courseNumber: string) {
        TutorSelection.init(courseNumber);
    }

    private static setEventHandlers() {
        $(CoursesWithTutors.SearchBarSelector).click(CoursesWithTutors.onSearchBarClick);
    }

    private static onSearchBarClick() {
        $(CoursesWithTutors.SearchBarSelector).val("");
    }
}