import { Component, OnInit } from '@angular/core';
import { AuthService } from '../global/service/auth/auth.service';
import { UserSessionService } from '../global/service/user-session.service';
import { CourseService } from '../course/course.service';
import { Course } from '../course/course.model';

@Component({
  selector: 'app-tutor-search',
  templateUrl: './tutor-search.component.html',
  styleUrls: ['./tutor-search.component.css']
})
export class TutorsearchComponent implements OnInit {

  constructor(private authService: AuthService,
              private userSessionService: UserSessionService,
              private courseService: CourseService) { }

  ngOnInit() {
  }

  onSignout() {
    this.userSessionService.signOutCurrentUser(this.authService.getAuth());
  }

  callMethod() {
    this.courseService.getCoursesCurrentUserHasntTutoredBefore().subscribe(
      (courses: Course[]) => {
        console.log(courses);
      }
    );
  }

}
