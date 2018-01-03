import { User } from '../user/user-model/user.model';

export class UserSession {

  private readonly user: User;
  private readonly sessionToken: string;

  public static userSessionJsonToUserSessionModel(userSessionJson: any): UserSession {
    const user: User = User.userJsonToUserModel(userSessionJson.user);
    const sessionToken: string = userSessionJson.sessionToken;
    return new UserSession(user, sessionToken);
  }

  constructor(user: User, sessionToken: string) {
    this.user = user;
    this.sessionToken = sessionToken;
  }

  getUser(): User {
    return this.user;
  }

  getSessionToken(): string {
    return this.sessionToken;
  }

}
