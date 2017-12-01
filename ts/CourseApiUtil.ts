class CourseApiUtil {

    private static readonly COURSESWITHTUTORSROUTE = "/api/courses/haveTutors";
    private static readonly COURSESUSERHASNTTUTOREDBEFOREROUTE = "/api/courses/notTutoring";
    private static readonly GETCOURSESUSERISTUTORINGROUTE = "/api/courses/tutoring";

    public static getCoursesWithTutors(successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.GetRequest(CourseApiUtil.COURSESWITHTUTORSROUTE, HttpRequestUtil.getSessionInfoJson(),
            successFunction, errorFunction
        )
    }

    public static getCoursesCurrentUserHasntTutoredBefore(
        successFunction: (data: any) => any, errorFunction: (data: any) => any
    ) {
        return HttpRequestUtil.GetRequest(CourseApiUtil.COURSESUSERHASNTTUTOREDBEFOREROUTE + "/" + UserSession.userId(),
            HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction
        );
    }

    public static getCoursesUserIsTutoring(userId: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.GetRequest(CourseApiUtil.GETCOURSESUSERISTUTORINGROUTE + "/" + userId,
            HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction);
    }
}