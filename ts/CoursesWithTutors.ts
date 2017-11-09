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
        $("#indexMain").html(Handlebars.templates[CoursesWithTutors.NAME + ".hb"]({
            courses: courses
        }));
        $("." + CoursesWithTutors.NAME + "-clickToGoToTutorSelection").click(CoursesWithTutors.clickCourse);
    }

    private static clickCourse() {
        let courseNumber: string = $(this).data("course_number");
        TutorSelection.init(courseNumber);
    }
}