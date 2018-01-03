import { ProfilePageLink } from './profile-page-link.model';

export class User {

  // private userId: string;
  // private _email: string;
  // private _userName: string;
  // private _profilePhotoId: string;
  // private _bio: string;
  // private _major: string;
  // private _github: ProfilePageLink;
  // private _facebook: ProfilePageLink;
  // private _linkedin: ProfilePageLink;
  // private _creationDate: Date;

  constructor(
    public userId: string,
    public email: string,
    public userName: string,
    public profilePhotoId: string,
    public bio: string,
    public major: string,
    public github: ProfilePageLink,
    public facebook: ProfilePageLink,
    public linkedin: ProfilePageLink,
    public creationDate: Date
  ) {
    // this.userId = userId;
    // this._email = email;
    // this._userName = userName;
    // this._profilePhotoId = profilePhotoId;
    // this._bio = bio;
    // this._major = major;
    // this._github = github;
    // this._facebook = facebook;
    // this._linkedin = linkedin;
    // this._creationDate = creationDate;
  }

  // get userId(): string {
  //   return this.userId;
  // }
  //
  // get email() {
  //   return this._email;
  // }
  //
  // get userName(): string {
  //   return this._userName;
  // }
  //
  // get profilePhotoId(): string {
  //   return this._profilePhotoId;
  // }
  //
  // get bio(): string {
  //   return this._bio;
  // }
  //
  // get major(): string {
  //   return this._major;
  // }
  //
  // get github(): ProfilePageLink {
  //   return this._github;
  // }
  //
  // get facebook(): ProfilePageLink {
  //   return this._facebook;
  // }
  //
  // get linkedin(): ProfilePageLink {
  //   return this._linkedin;
  // }
  //
  // get creationDate(): Date {
  //   return this._creationDate;
  // }
  //
  // set userId(userId: string) {
  //   this.userId = userId;
  // }
  //
  // set email(email: string) {
  //   this._email = email;
  // }
  //
  // set userName(userName: string) {
  //   this._userName = userName;
  // }
  //
  // set profilePhotoId(profilePhotoId: string) {
  //   this._profilePhotoId = profilePhotoId;
  // }
  //
  // set bio(bio: string) {
  //   this._bio = bio;
  // }
  //
  // set major(major: string) {
  //   this._major = major;
  // }
  //
  // set creationDate(creationDate: Date) {
  //   this._creationDate = creationDate;
  // }

  public static userJsonToUserModel(userJson: any): User {
    const userId = userJson.userId;
    const email = userJson.email;
    const userName = userJson.name;
    const profilePhotoId = userJson.profilePhotoId;
    const bio = userJson.bio;
    const major = userJson.major;
    const github = userJson.github == null ? null : ProfilePageLink.toModelFromJson(userJson.github);
    const facebook = userJson.facebook == null ? null : ProfilePageLink.toModelFromJson(userJson.facebook);
    const linkedin = userJson.linkedin == null ? null : ProfilePageLink.toModelFromJson(userJson.linkedin);
    const creationDate = userJson.creationDate;

    return new User(
      userId, email, userName,
      profilePhotoId, bio, major,
      github, facebook, linkedin,
      creationDate
    );
  }
}
