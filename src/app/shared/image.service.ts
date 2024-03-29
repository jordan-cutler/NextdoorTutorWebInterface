import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from './user-session/user-session.service';

@Injectable()
export class ImageService {

  private static readonly GETPROFILEPICTUREROUTE = '/api/drive/download/profilePhoto';
  private static readonly POSTPROFILEPICTUREROUTE = '/api/drive/upload/profilePhoto';

  static generateNewQueryString(userId: string) {
    return '?userId=' + userId;
  }

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) {
  }

  uploadProfilePictureToServer(file: File | Blob) {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    return this.httpClient.post(
      ImageService.POSTPROFILEPICTUREROUTE,
      file,
      { headers: new HttpHeaders().append('Content-Type', file.type) }
    );
  }

  // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
  getNewProfilePhotoUrlForCurrentUser() {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    return ImageService.GETPROFILEPICTUREROUTE + '/' + currentUserId +
      ImageService.generateNewQueryString(currentUserId) + '&time=' + new Date().getTime();
  }

  getNewProfilePhotoUrl(userId: string, askerId: string) {
    return ImageService.GETPROFILEPICTUREROUTE + '/' + userId + ImageService.generateNewQueryString(askerId);
  }

}
