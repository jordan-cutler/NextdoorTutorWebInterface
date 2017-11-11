class Tutor {
    private _userId: string;
    private _email: string;
    private _name: string;
    private _profilePhotoUrl: string;
    private _hourlyRate: number;
    private _courseNumber: string;
    private _grade: string;
    private _instructor: string;
    private _pastExperience: string;
    private _notes: string;

    constructor(userId: string, email: string, name: string, profilePhotoUrl: string, hourlyRate: number, courseNumber: string, grade: string, instructor: string, pastExperience: string, notes: string) {
        this._userId = userId;
        this._email = email;
        this._name = name;
        this._profilePhotoUrl = profilePhotoUrl;
        this._hourlyRate = hourlyRate;
        this._courseNumber = courseNumber;
        this._grade = grade;
        this._instructor = instructor;
        this._pastExperience = pastExperience;
        this._notes = notes;
    }


    get userId(): string {
        return this._userId;
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get profilePhotoUrl(): string {
        return this._profilePhotoUrl;
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
}