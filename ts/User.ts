class User {

    private _userId: string = "";
    private _email: string = "";
    private _userName: string = "";
    private _profilePhotoId: string = "";
    private _bio: string = "";
    private _major: string = "";
    private _creationDate: Date;

    constructor(userId: string, email: string, userName: string, profilePhotoId: string, bio: string, major: string, creationDate: Date) {
        this._userId = userId;
        this._email = email;
        this._userName = userName;
        this._profilePhotoId = profilePhotoId;
        this._bio = bio;
        this._major = major;
        this._creationDate = creationDate;
    }

    get userId(): string {
        return this._userId;
    }

    get email() {
        return this._email;
    }

    get userName(): string {
        return this._userName;
    }

    get profilePhotoId(): string {
        return this._profilePhotoId;
    }

    get bio(): string {
        return this._bio;
    }

    get major(): string {
        return this._major;
    }

    get creationDate(): Date {
        return this._creationDate;
    }

    set userId(userId: string) {
        this._userId = userId;
    }

    set email(email: string) {
        this._email = email;
    }

    set userName(userName: string) {
        this._userName = userName;
    }

    set profilePhotoId(profilePhotoId: string) {
        this._profilePhotoId = profilePhotoId;
    }

    set bio(bio: string) {
        this._bio = bio;
    }

    set major(major: string) {
        this._major = major;
    }

    set creationDate(creationDate: Date) {
        this._creationDate = creationDate;
    }

    public static userJsonToUserModel(userJson: any): User {
        let userId = userJson.userId;
        let email = userJson.email;
        let userName = userJson.name;
        let profilePhotoId = userJson.profilePhotoId;
        let bio = userJson.bio;
        let major = userJson.major;
        let creationDate = userJson.creationDate;
        return new User(userId, email, userName, profilePhotoId, bio, major, creationDate);
    }
}