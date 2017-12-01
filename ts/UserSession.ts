/// <reference path="User.ts" />

class UserSession {

    private _user: User;
    private _sessionToken: string = "";
    private static _loggedUser: UserSession;

    constructor(user: User, sessionToken: string) {
        this._user = user;
        this._sessionToken = sessionToken;
    }

    static setLoggedInUser(userSession: UserSession) {
        this._loggedUser = userSession;
    }

    get user(): User {
        return this._user;
    }

    get sessionToken(): string {
        return this._sessionToken;
    }

    set user(value: User) {
        this._user = value;
    }

    set sessionToken(value: string) {
        this._sessionToken = value;
    }

    static currentUser() {
        return UserSession._loggedUser._user;
    }

    static userId() {
        return UserSession._loggedUser._user.userId;
    }

    static sessionToken() {
        return UserSession._loggedUser.sessionToken;
    }

    // static destroyUser() {
    //     UserSession._loggedUser = null;
    // }

    public static userSessionJsonToUserSessionModel(userSessionJson: any): UserSession {
        let user: User = User.userJsonToUserModel(userSessionJson.user);
        let sessionToken: string = userSessionJson.sessionToken;
        return new UserSession(user, sessionToken);
    }
}