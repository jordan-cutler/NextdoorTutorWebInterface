import { Subject } from 'rxjs/Subject';

export class CropImageService {

  private profileImageUploadedSubject = new Subject<File>();

  sendMessageToOpenModal(file: File) {
    this.profileImageUploadedSubject.next(file);
  }

  getProfileImageUploadedSubject() {
    return this.profileImageUploadedSubject;
  }
}
