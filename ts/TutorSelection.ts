/// <reference path="Tutor.ts" />
/// <reference path="TutorView.ts" />

class TutorSelection {

    private static readonly NAME = "TutorSelection";
    private static readonly GETUTORSFORCOURSEROUTE = "/api/tutors/course";
    private static tutors: Tutor[];

    public static init(courseNumber: string) {
        HttpRequestUtil.GetRequest(TutorSelection.GETUTORSFORCOURSEROUTE,
            {courseNumber: courseNumber, userId: User.userId(), sessionToken: User.sessionToken()},
            function (data: any) {
                TutorSelection.showTutors(data, courseNumber);
            },
            TutorSelection.onGetTutorsForCourseError
        );
    }

    /*
     Response in this form:
     [
        {
            "userId": "string",
            "email": "string",
             "name": "string",
             "profilePhotoId": "string",
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
    private static showTutors(data: any, courseNumber: string) {
        TutorSelection.setTutors(TutorSelection.getTutorsArrayFromJsonData(data));
        $("#CoursesWithTutors-TutorList").html(Handlebars.templates[TutorSelection.NAME + ".hb"]({
            tutors: TutorSelection.getTutors(),
            courseNumber: courseNumber
        }));
        $("." + TutorSelection.NAME + "-clickToViewTutor").click(TutorSelection.pullUpTutor);
    }

    private static pullUpTutor() {
        let indexOfTutorClicked = $(this).data("tutor_index");
        let tutor = TutorSelection.getTutors()[indexOfTutorClicked];
        TutorView.init(tutor);
    }

    private static getTutorsArrayFromJsonData(tutorsJsonResponse: any) {
        let tutors: Tutor[] = [];

        tutorsJsonResponse.forEach(function (tutorJson: any) {
            let userId: string = tutorJson.userId;
            let email: string = tutorJson.email;
            let name: string = tutorJson.name;
            let profilePhotoUrl: string = tutorJson.profilePhotoId;
            let hourlyRate: number = Number(tutorJson.hourlyRate);
            let courseNumber: string = tutorJson.courseNumber;
            let grade: string = tutorJson.grade;
            let instructor: string = tutorJson.instructor;
            let pastExperience: string = tutorJson.pastExperience;
            let notes: string = tutorJson.notes;
            let tutor: Tutor =
                new Tutor(
                    userId, email, name, profilePhotoUrl, hourlyRate, courseNumber,
                    grade, instructor, pastExperience, notes
                );
            tutors.push(tutor);
        });
        return tutors;
    }

    private static onGetTutorsForCourseError(data: any) {

    }

    private static setTutors(tutors: Tutor[]) {
        TutorSelection.tutors = tutors;
    }

    private static getTutors() {
        return TutorSelection.tutors;
    }
}