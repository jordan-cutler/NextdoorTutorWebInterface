class TutorApiUtil {

    private static readonly ADDTUTORROUTE = "/api/tutors/add";
    private static readonly GETUTORSFORCOURSEROUTE = "/api/tutors/course";
    private static readonly GETTUTORROUTE = "/api/tutors";
    private static readonly DELETETUTORROUTE = "/api/tutors";
    private static readonly UPDATETUTORROUTE = "/api/tutors";
    private static readonly REQUESTUTORROUTE = "/api/tutors/request";

    public static addTutor(userId: string, hourlyRate: number, courseNumber: string, grade: string, instructor: string,
                           pastExperience: string, notes: string, yearTaken: number | null, semesterTaken: string,
                           hasTakenCourse: boolean, sessionToken: string,
                           successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        let tutorData = {
            userId: userId,
            hourlyRate: hourlyRate,
            courseNumber: courseNumber,
            grade: grade,
            instructor: instructor,
            pastExperience: pastExperience,
            notes: notes,
            yearTaken: yearTaken,
            semesterTaken: semesterTaken,
            hasTakenCourse: hasTakenCourse,
            sessionToken: sessionToken
        };

        return HttpRequestUtil.PostRequest(TutorApiUtil.ADDTUTORROUTE, tutorData, successFunction, errorFunction);
    }

    public static getTutorsForCourse(courseNumber: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.GetRequest(
            TutorApiUtil.GETUTORSFORCOURSEROUTE + "/" + courseNumber,
            HttpRequestUtil.getSessionInfoJson(), successFunction, errorFunction
        );
    }

    public static getTutorById(tutorId: string, courseNumber: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.GetRequest(
            TutorApiUtil.GETTUTORROUTE + "/" + tutorId,
            {courseNumber: courseNumber, userId: UserSession.userId(), sessionToken: UserSession.sessionToken()},
            successFunction, errorFunction);
    }

    public static removeCurrentUserFromCourseTutor(courseNumber: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.DeleteRequest(TutorApiUtil.DELETETUTORROUTE,
            {courseNumber: courseNumber, userId: UserSession.userId(), sessionToken: UserSession.sessionToken()},
            successFunction, errorFunction);
    }

    public static updateTutorAsCurrentUser(courseNumber: string, hourlyRate: number, pastExperience: string, notes: string,
                                           successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.PutRequest(TutorApiUtil.UPDATETUTORROUTE,
            {
                userId: UserSession.userId(), sessionToken: UserSession.sessionToken(),
                courseNumber: courseNumber, hourlyRate: hourlyRate,
                pastExperience: pastExperience, notes: notes
            },
            successFunction, errorFunction
        );
    }

    public static sendEmailToTutor(subject: string, message: string, tutorEmail: string, relatedCourse: string, successFunction: (data: any) => any, errorFunction: (data: any) => any) {
        return HttpRequestUtil.PostRequest(TutorApiUtil.REQUESTUTORROUTE,
            {
                userId: UserSession.userId(), sessionToken: UserSession.sessionToken(),
                subject: subject, message: message, tutorEmail: tutorEmail, relatedCourse: relatedCourse
            },
            successFunction, errorFunction
        );
    }
}