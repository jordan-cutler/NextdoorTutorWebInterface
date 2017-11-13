class TutorApiUtil {

    private static readonly ADDTUTORROUTE = "/api/tutors/add";
    private static readonly GETUTORSFORCOURSEROUTE = "/api/tutors/course";
    private static readonly GETTUTORROUTE = "/api/tutors";

    public static addTutor(userId: string, hourlyRate: number, courseNumber: string, grade: string, instructor: string,
                           pastExperience: string, notes: string, sessionToken: string,
                           successFunction: (data: any) => any, errorFunction: (data: any) => any) {
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

        HttpRequestUtil.PostRequest(TutorApiUtil.ADDTUTORROUTE, tutorData, successFunction, errorFunction);
    }

    public static getTutorsForCourse(courseNumber: string,
                                     successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.GetRequest(
            TutorApiUtil.GETUTORSFORCOURSEROUTE + "/" + courseNumber,
            HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction
        );
    }

    public static getTutorById(tutorId: string, courseNumber: string,
                               successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        HttpRequestUtil.GetRequest(
            TutorApiUtil.GETTUTORROUTE + "/" + tutorId,
            {courseNumber: courseNumber, userId: User.userId(), sessionToken: User.sessionToken()},
            successFunction, errorFunction);
    }
}