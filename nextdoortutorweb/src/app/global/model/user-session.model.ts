import { User } from '../../user/user.model';

export class UserSession {

  private readonly _user: User;
  private readonly _sessionToken: string;

  constructor(user: User, sessionToken: string) {
    this._user = user;
    this._sessionToken = sessionToken;
  }
  
  get user(): User {
    return this._user;
  }

  get sessionToken(): string {
    return this._sessionToken;
  }

  public static userSessionJsonToUserSessionModel(userSessionJson: any): UserSession {
    const user: User = User.userJsonToUserModel(userSessionJson.user);
    const sessionToken: string = userSessionJson.sessionToken;
    return new UserSession(user, sessionToken);
  }
}
