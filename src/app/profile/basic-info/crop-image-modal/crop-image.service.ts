import { Subject } from 'rxjs/Subject';

export class CropImageService {
  private successfulImageUploadSubject = new Subject();

  sendSuccessfulImageUploadedEvent() {
    this.successfulImageUploadSubject.next();
  }

  getSuccessfulImageUploadObservable() {
    return this.successfulImageUploadSubject.asObservable();
  }
}
