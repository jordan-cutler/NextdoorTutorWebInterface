/// <reference path="Course.ts" />
class CoursesWithTutors {

    private static readonly NAME = "CoursesWithTutors";
    private static readonly COURSESWITHTUTORSROUTE = "/api/courses/haveTutors";
    public static init() {
        // $.ajax({
        //         url: CoursesWithTutors.COURSESWITHTUTORSROUTE + "?userId=" + User.userId() + "&sessionToken=" + User.sessionToken(),
        //         type: "GET",
        //         contentType: "application/json",
        //         dataType: "json",
        //         success: function(data: any) {
        //             let courses = CoursesWithTutors.getCoursesArrayFromJson(data);
        //             CoursesWithTutors.setHandlebarsTemplate(courses);
        //         },
        //         error: function(data: any) {
        //             window.alert("Failed to retrieve courses with tutors. Please refresh the page and try again.");
        //         }
        //     }
        // );
        HttpRequestUtil.GetRequest(CoursesWithTutors.COURSESWITHTUTORSROUTE, HttpRequestUtil.getSessionInfoJson(),
            function(data: any) {
                let courses = CoursesWithTutors.getCoursesArrayFromJson(data);
                CoursesWithTutors.setHandlebarsTemplate(courses);
            },
            function(data: any) {
                window.alert("Failed to retrieve courses with tutors. Please refresh the page and try again.");
            }
        )
    }

    private static getCoursesArrayFromJson(coursesJsonResponse: any) {
        let courses: Course[] = [];
        coursesJsonResponse.forEach(function(courseJson: any) {
            let course: Course = new Course(courseJson.courseNumber);
            courses.push(course);
        });
        return courses;
    }

    private static setHandlebarsTemplate(courses: Course[]) {
        $("#indexMain").html(Handlebars.templates[CoursesWithTutors.NAME + ".hb"]({
            courses: courses
        }));
    }


}