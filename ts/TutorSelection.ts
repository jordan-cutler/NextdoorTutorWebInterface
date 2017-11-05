/// <reference path="Tutor.ts" />

class TutorSelection {

    private static readonly NAME = "TutorSelection";
    private static readonly GETUTORSFORCOURSEROUTE = "/api/tutors/course";

    public static init(courseNumber: string) {
        HttpRequestUtil.GetRequest(TutorSelection.GETUTORSFORCOURSEROUTE,
            { courseNumber: courseNumber, userId: User.userId(), sessionToken: User.sessionToken() },
            TutorSelection.onGetTutorsForCourseSuccess, TutorSelection.onGetTutorsForCourseError
        );
    }

    /*
    Response in this form:
     [
        {
             "userId": "string",
             "email": "string",
             "name": "string",
             "profilePhotoUrl": "string",
             "hourlyRate": 0,
             "courseNumber": "string",
             "grade": "string",
             "instructor": "string",
             "pastExperience": "string",
             "notes": "string"
        }
     ]
     Put all of them in Tutor objects similar to how Course was used and pass
     data to handlebars file
     */
    private static onGetTutorsForCourseSuccess(data: any) {
        let tutors: Tutor[] = TutorSelection.getTutorsArrayFromJsonData(data);
        $("#indexMain").html(Handlebars.templates[TutorSelection.NAME + ".hb"]({
            tutors: tutors
        }));
        // TODO: Add event handlers for each of these tutors to pull up their info
    }

    private static getTutorsArrayFromJsonData(data: any) {
        let tutors: Tutor[] = [];

        // TODO: Code to parse json data into an array of tutors

        return tutors;
    }

    private static onGetTutorsForCourseError(data: any) {

    }
}