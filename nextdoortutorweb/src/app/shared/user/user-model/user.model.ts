import { ProfilePageLink } from './profile-page-link.model';

export class User {

  constructor(
    public userId: string,
    public email: string,
    public name: string,
    public profilePhotoId: string,
    public bio: string,
    public major: string,
    public github: ProfilePageLink,
    public facebook: ProfilePageLink,
    public linkedin: ProfilePageLink,
    public creationDate: Date,
    public isInstructor: boolean
  ) {
  }

  public static userJsonToUserModel(userJson: any): User {
    const userId = userJson.userId;
    const email = userJson.email;
    const name = userJson.name;
    const profilePhotoId = userJson.profilePhotoId;
    const bio = userJson.bio;
    const major = userJson.major;
    const github = userJson.github == null ? null : ProfilePageLink.toModelFromJson(userJson.github);
    const facebook = userJson.facebook == null ? null : ProfilePageLink.toModelFromJson(userJson.facebook);
    const linkedin = userJson.linkedin == null ? null : ProfilePageLink.toModelFromJson(userJson.linkedin);
    const creationDate = userJson.creationDate;
    const isInstructor = userJson.isInstructor;

    return new User(
      userId, email, name,
      profilePhotoId, bio, major,
      github, facebook, linkedin,
      creationDate, isInstructor
    );
  }
}
