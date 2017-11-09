class TutorApplication {

    private static readonly NAME = "TutorApplication";
    private static readonly ADDTUTORROUTE = "/api/tutors/add";
    private static readonly COURSESTOTUTORROUTE = "/api/courses";

    public static init() {
        HttpRequestUtil.GetRequest(TutorApplication.COURSESTOTUTORROUTE, HttpRequestUtil.getSessionInfoJson(),
            function(data: any) {
                let courses = Course.CourseJsonArrayToCourseModelArray(data);
                TutorApplication.displayApplication(courses);
            },
            function(data: any) {
                window.alert("Failed to retrieve courses available for tutoring.");
            }
        )
    }

    private static displayApplication(courses: Course[]) {
        $("#indexMain").html(Handlebars.templates[TutorApplication.NAME + ".hb"]({
            courses: courses
        }));
        $('select').material_select();
        $('input.character-count').characterCounter();
        $("#" + TutorApplication.NAME + "-Submit").click(TutorApplication.submitApplication);
    }

    private static submitApplication() {
        let userId: string = User.userId();
        let sessionToken: string = User.sessionToken();
        let hourlyRateString: string = $("#hourlyRateOutput").val();
        let hourlyRate: number = Number(hourlyRateString.substring(1, hourlyRateString.length - 3));    // Removes the $ and /hr from the string.
        let courseNumber: string = $("#" + TutorApplication.NAME + "-course option:selected").text();
        let grade: string = $("#" + TutorApplication.NAME + "-grade option:selected").text();
        let instructor: string = $("#" + TutorApplication.NAME + "-instructor").val();
        let pastExperience: string = $("#" + TutorApplication.NAME + "-Application-Experience").val();
        let notes: string = $("#" + TutorApplication.NAME + "-notes").val();

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
}