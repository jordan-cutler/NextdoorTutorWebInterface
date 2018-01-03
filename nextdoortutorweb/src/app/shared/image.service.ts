import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from './user-session/user-session.service';

@Injectable()
export class ImageService {

  private static readonly GETPROFILEPICTUREROUTE = '/api/drive/download/profilePhoto';
  private static readonly POSTPROFILEPICTUREROUTE = '/api/drive/upload/profilePhoto';

  static generateNewQueryString(userId: string, sessionToken: string) {
    return '?userId=' + userId + '&sessionToken=' + sessionToken; // + '&time=' + new Date().getTime();
  }

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) {
  }

  uploadProfilePictureToServer(file: File | Blob) {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    const sessionToken = this.userSessionService.getCurrentUserSession().getSessionToken();
    return this.httpClient.post(
      ImageService.POSTPROFILEPICTUREROUTE + '/' + currentUserId,
      file,
      { headers: new HttpHeaders().set('Authorization', sessionToken) }
    );
    // $.ajax({
    //   url: ImageService.POSTPROFILEPICTUREROUTE + '/' + currentUserId,
    //   method: 'POST',
    //   data: file,
    //   processData: false,  // tell jQuery not to process the data as a string
    //   contentType: file.type,
    //   headers: {"Authorization": UserSession.getSessionToken()},
    //   success: successFunction,
    //   error: errorFunction
    // });
  }

  // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
  getNewProfilePhotoUrlForCurrentUser() {
    const currentUserId = this.userSessionService.getCurrentUser().userId;
    const sessionToken = this.userSessionService.getCurrentUserSession().getSessionToken();
    return ImageService.GETPROFILEPICTUREROUTE + '/' + currentUserId + ImageService.generateNewQueryString(currentUserId, sessionToken);
  }

  // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
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
