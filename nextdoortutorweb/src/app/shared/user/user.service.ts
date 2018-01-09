import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private static readonly UPDATEBIOROUTE = '/user/bio';
  private static readonly UPDATEMAJORROUTE = '/user/major';
  private static readonly UPDATEGITHUBROUTE = '/user/github';
  private static readonly UPDATEFACEBOOKROUTE = '/user/facebook';
  private static readonly UPDATELINKEDINROUTE = '/user/linkedin';

  constructor(private httpClient: HttpClient) {

  }

  updateBio(bio: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATEBIOROUTE, { bio: bio });
  }

  updateMajor(major: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATEMAJORROUTE, { major: major });
  }

  updateGithub(github: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATEGITHUBROUTE, { profileLink: github });
  }

  updateFacebook(facebook: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATEFACEBOOKROUTE, { profileLink: facebook });
  }

  updateLinkedin(linkedin: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATELINKEDINROUTE, { profileLink: linkedin });
  }
}
