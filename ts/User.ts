class User {

    private _email: string = "";
    private _userName: string = "";
    private _userId: string = "";
    private _sessionToken: string = "";
    private _profilePhotoId: string = "";
    private _bio: string = "";
    private static _loggedUser: any = null;

    static getUser() {
        if (User._loggedUser == null) {
            User._loggedUser = new User();
        }
        return User._loggedUser;
    }

    static email() {
        return User._loggedUser._email;
    }

    static userName(): string {
        return User._loggedUser._userName;
    }

    static userId(): string {
        return User._loggedUser._userId;
    }

    static sessionToken(): string {
        return User._loggedUser._sessionToken;
    }

    static profilePhotoId(): string {
        return User._loggedUser._profilePhotoId;
    }

    static bio(): string {
        return User._loggedUser._bio;
    }

    static setFields(user: User, sessionToken: string,
                     email: string, name: string, id: string, profilePhotoId: string, bio: string) {
        user.sessionToken = sessionToken;
        user.email = email;
        user.userName = name;
        user.userId = id;
        user.profilePhotoId = profilePhotoId;
        user.bio = bio;
    }

    set email(value: string) {
        User._loggedUser._email = value;
    }

    set userName(value: string) {
        User._loggedUser._userName = value;
    }

    set userId(value: string) {
        User._loggedUser._userId = value;
    }

    set sessionToken(value: string) {
        User._loggedUser._sessionToken = value;
    }

    set profilePhotoId(value: string) {
        User._loggedUser._profilePhotoId = value;
    }

    set bio(value: string) {
        User._loggedUser._bio = value;
    }

    static destroyUser() {
        User._loggedUser = null;
    }
}