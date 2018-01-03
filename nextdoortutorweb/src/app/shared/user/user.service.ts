import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private static readonly UPDATEBIOROUTE = '/user/bio';
  private static readonly UPDATEMAJORROUTE = '/user/major';

  constructor(private httpClient: HttpClient) {

  }

  updateBio(bio: string): any {
    return this.httpClient.put(UserService.UPDATEBIOROUTE, {bio: bio});
  }

  updateMajor(major: string) {
    return this.httpClient.put(UserService.UPDATEMAJORROUTE, {major: major});
  }
}
