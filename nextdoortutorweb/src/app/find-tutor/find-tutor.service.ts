import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class FindTutorService {

  private courseSelectedSubject = new Subject<string>();

  courseSelected(courseNumber: string) {
    this.courseSelectedSubject.next(courseNumber);
  }

  getCourseSelectedObservable(): Observable<string> {
    return this.courseSelectedSubject.asObservable();
  }
}
