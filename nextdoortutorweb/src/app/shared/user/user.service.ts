import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private static readonly UPDATEBIOROUTE = '/user/bio';
  private static readonly UPDATEMAJORROUTE = '/user/major';

  constructor(private httpClient: HttpClient) {

  }

  updateBio(bio: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATEBIOROUTE, {bio: bio});
  }

  updateMajor(major: string): Observable<boolean> {
    return this.httpClient.put<boolean>(UserService.UPDATEMAJORROUTE, {major: major});
  }
}
