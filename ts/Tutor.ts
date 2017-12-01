class Tutor {
    private _user: User;
    private _hourlyRate: number;
    private _courseNumber: string;
    private _grade: string;
    private _instructor: string;
    private _pastExperience: string;
    private _notes: string;

    constructor(user: User, hourlyRate: number, courseNumber: string, grade: string, instructor: string, pastExperience: string, notes: string) {
        this._user = user;
        this._hourlyRate = hourlyRate;
        this._courseNumber = courseNumber;
        this._grade = grade;
        this._instructor = instructor;
        this._pastExperience = pastExperience;
        this._notes = notes;
    }

    get userId(): string {
        return this._user.userId;
    }

    get email(): string {
        return this._user.email;
    }

    get name(): string {
        return this._user.userName;
    }

    get major(): string {
        return this._user.major;
    }

    get hourlyRate(): number {
        return this._hourlyRate;
    }

    get courseNumber(): string {
        return this._courseNumber;
    }

    get grade(): string {
        return this._grade;
    }

    get instructor(): string {
        return this._instructor;
    }

    get pastExperience(): string {
        return this._pastExperience;
    }

    get notes(): string {
        return this._notes;
    }

    public static tutorJsonArrayToTutorModel(tutorsJsonResponse: any) {
        let tutors: Tutor[] = [];
        tutorsJsonResponse.forEach(function (tutorJson: any) {
            let tutor = Tutor.tutorJsonToTutorModel(tutorJson);
            tutors.push(tutor);
        });
        return tutors;
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
    public static tutorJsonToTutorModel(tutorJson: any) {
        let user: User = User.userJsonToUserModel(tutorJson.user);
        let hourlyRate: number = Number(tutorJson.hourlyRate);
        let courseNumber: string = tutorJson.courseNumber;
        let grade: string = tutorJson.grade;
        let instructor: string = tutorJson.instructor;
        let pastExperience: string = tutorJson.pastExperience;
        let notes: string = tutorJson.notes;
        return new Tutor(
                user, hourlyRate, courseNumber,
                grade, instructor, pastExperience, notes
            );
    }
}