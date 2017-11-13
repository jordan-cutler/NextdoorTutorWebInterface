class CourseApiUtil {

    private static readonly COURSESWITHTUTORSROUTE = "/api/courses/haveTutors";
    private static readonly COURSESUSERHASNTTUTOREDBEFOREROUTE = "/api/courses/notTutoring";
    private static readonly GETCOURSESUSERISTUTORINGROUTE = "/api/courses/tutoring";

    public static getCoursesWithTutors(successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.GetRequest(CourseApiUtil.COURSESWITHTUTORSROUTE, HttpRequestUtil.getSessionInfoJson(),
            successFunction, errorFunction
        )
    }

    public static getCoursesCurrentUserHasntTutoredBefore(
        successFunction: (data: any) => any, errorFunction: (data: any) => any
    ) {
        HttpRequestUtil.GetRequest(CourseApiUtil.COURSESUSERHASNTTUTOREDBEFOREROUTE + "/" + User.userId(),
            HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction
        );
    }

    public static getCoursesUserIsTutoring(userId: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.GetRequest(CourseApiUtil.GETCOURSESUSERISTUTORINGROUTE + "/" + User.userId(),
            HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction);
    }
}