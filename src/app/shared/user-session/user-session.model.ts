import { User } from '../user/user-model/user.model';

export class UserSession {

  private user: User;
  private readonly jwt: string;

  public static toModelFromJson(userSessionJson: any): UserSession {
    const user: User = User.userJsonToUserModel(userSessionJson.user);
    const sessionToken: string = userSessionJson.jwt;
    return new UserSession(user, sessionToken);
  }

  constructor(user: User, jwt: string) {
    this.user = user;
    this.jwt = jwt;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  getJwt(): string {
    return this.jwt;
  }

}
