import { Subject } from 'rxjs/Subject';

export class EmailTutorService {
  private emailTutorModalOpenSubject = new Subject<EmailTutorData>();
  
  getEmailTutorModalOpenSubject() {
    return this.emailTutorModalOpenSubject;
  }
}
