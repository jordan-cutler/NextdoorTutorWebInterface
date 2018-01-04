import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from './user-session/user-session.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ImageService {

  private static readonly GETPROFILEPICTUREROUTE = '/api/drive/download/profilePhoto';
  private static readonly POSTPROFILEPICTUREROUTE = '/api/drive/upload/profilePhoto';

  newProfilePictureUploadedEvent = new Subject();

  static generateNewQueryString(userId: string, sessionToken: string) {
    return '?userId=' + userId + '&sessionToken=' + sessionToken;
  }

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) {
  }

  uploadProfilePictureToServer(file: File | Blob) {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    const sessionToken = this.userSessionService.getCurrentUserSession().getSessionToken();
    return this.httpClient.post(
      ImageService.POSTPROFILEPICTUREROUTE + '/' + currentUserId,
      file,
      {
        headers:
          new HttpHeaders()
            .set('Authorization', sessionToken)
            .append('Content-Type', file.type)
      }
    );
  }

  // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
  getNewProfilePhotoUrlForCurrentUser() {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    const sessionToken = this.userSessionService.getCurrentUserSession().getSessionToken();
    return ImageService.GETPROFILEPICTUREROUTE + '/' + currentUserId +
      ImageService.generateNewQueryString(currentUserId, sessionToken) + '&time=' + new Date().getTime();
  }

  getNewProfilePhotoUrl(userId: string, sessionToken: string, askerId: string) {
    return ImageService.GETPROFILEPICTUREROUTE + '/' + userId + ImageService.generateNewQueryString(askerId, sessionToken);
  }

  hideImagesUntilLoaded(preloaderSelector: string, imagesSelector: string) {
    // $(imagesSelector).hide();
    // $(preloaderSelector).show();
    // setTimeout(function() {
    //   $(preloaderSelector).hide();
    //   $(imagesSelector).show();
    // }, 1700);
  }
}
