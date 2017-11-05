/// <reference path="TutorApplication.ts" />

class CoursesToTutor {
    private static readonly NAME = "CoursesToTutor";
    private static readonly COURSESTOTUTORROUTE = "/api/courses";

    public static init() {
        HttpRequestUtil.GetRequest(CoursesToTutor.COURSESTOTUTORROUTE, HttpRequestUtil.getSessionInfoJson(),
            function(data: any) {
                let courses = CoursesToTutor.getCoursesArrayFromJson(data);
                CoursesToTutor.setHandlebarsTemplate(courses);
            },
            function(data: any) {
                window.alert("Failed to retrieve courses with tutors. Please refresh the page and try again.");
            }
        )
    }

    private static getCoursesArrayFromJson(coursesJsonResponse: any) {
        let courses: Course[] = [];
        coursesJsonResponse.forEach(function(courseJson: any) {
            let course: Course = new Course(courseJson.courseNumber, courseJson.title);
            courses.push(course);
        });
        return courses;
    }

    private static setHandlebarsTemplate(courses: Course[]) {
        $("#indexMain").html(Handlebars.templates[CoursesToTutor.NAME + ".hb"]({
            courses: courses
        }));
        $("." + CoursesToTutor.NAME + "-clickToTutor").click(CoursesToTutor.clickCourse);
    }

    private static clickCourse() {
        let courseNumber: string = $(this).data("course_number");
        TutorApplication.init(courseNumber);
    }
}
