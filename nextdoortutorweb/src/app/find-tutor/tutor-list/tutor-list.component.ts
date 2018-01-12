import {
  AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit,
  ViewContainerRef
} from '@angular/core';
import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';
import { ImageService } from '../../shared/image.service';
import { UserSessionService } from '../../shared/user-session/user-session.service';
import { EmailTutorService } from './email-tutor-modal/email-tutor.service';
import { DataNeededToFormEmailToTutor } from './email-tutor-modal/DataNeededToFormEmailToTutor';
import { EmailTutorModalComponent } from './email-tutor-modal/email-tutor-modal.component';
import { Grade } from '../../shared/tutor/tutor-model/grade.model';
import { FindTutorService } from '../find-tutor.service';
import { Subscription } from 'rxjs/Subscription';
import { TutorService } from '../../shared/tutor/tutor.service';
import { TutorSortService } from './tutor-sort.service';
import { User } from '../../shared/user/user-model/user.model';
import { DynamicComponentGenerator } from '../../shared/dynamic-component-generator';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tutors: Tutor[];

  currentUser: User;
  currentUserSubscription: Subscription;

  dynamicEmailTutorComponentGenerator: DynamicComponentGenerator<EmailTutorModalComponent>;

  constructor(public userSessionService: UserSessionService,
              private tutorSortService: TutorSortService,
              private tutorService: TutorService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.currentUser = this.userSessionService.getCurrentUser();
    this.currentUserSubscription = this.userSessionService.getCurrentUserObservable().subscribe(
      (user: User) => this.currentUser = user
    );
    this.dynamicEmailTutorComponentGenerator = new DynamicComponentGenerator<EmailTutorModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, EmailTutorModalComponent
    );
  }

  onSortAscendingClick() {
    this.tutorSortService.sortAscending(this.tutors);
  }

  onSortDescendingClick() {
    this.tutorSortService.sortDescending(this.tutors);
  }

  onSortByHourlyRateClick() {
    this.tutorSortService.sortByHourlyRate(this.tutors);
  }

  onSortByGradeClick() {
    this.tutorSortService.sortByGrade(this.tutors);
  }

  ngAfterViewInit() {
    $('.collapsible').collapsible();
    $('input.character-count').characterCounter();
    $('textarea.character-count').characterCounter();
  }

  onBookTutor(event: Event, email: string, courseNumber: string, name: string) {
    event.preventDefault();
    event.stopPropagation();
    const emailTutorData: DataNeededToFormEmailToTutor = {
      tutorEmail: email,
      courseNumber: courseNumber,
      tutorName: name
    };
    this.createEmailTutorModalComponent(emailTutorData);
  }

  instructorEndorseTutor(event: Event, tutorId: string, tutorCourseNumber: string, tutor: Tutor, instructorName: string) {
    event.preventDefault();
    event.stopPropagation();
    this.tutorService.giveInstructorEndorsement(tutorId, tutorCourseNumber).subscribe(
      (isSuccessful: boolean) => {
        if (isSuccessful) {
          tutor.instructorNameWhoEndorsed = instructorName;
        } else {
          Materialize.toast(
            'Failed to endorse tutor. Make sure you check with Jordan Cutler that you are registered as an instructor',
            3000);
        }
      },
      (error) => {
        Materialize.toast(
          'Failed to endorse tutor. Make sure you check with Jordan Cutler that you are registered as an instructor',
          3000);
      }
    );
  }

  removeInstructorEndorsement(event: Event, tutorId: string, tutorCourseNumber: string, tutor: Tutor, instructorName: string) {
    event.preventDefault();
    event.stopPropagation();
    if (tutor.instructorNameWhoEndorsed !== instructorName) {
      Materialize.toast('You are not allowed to remove a different professor endorsement', 3000);
      return false;
    }
    this.tutorService.removeInstructorEndorsement(tutorId, tutorCourseNumber).subscribe(
      (isSuccessful: boolean) => {
        if (isSuccessful) {
          tutor.instructorNameWhoEndorsed = null;
        } else {
          Materialize.toast('Failed to remove endorsement. Make sure you are the instructor who gave the endorsement', 3000);
        }
      },
      (error) => {
        Materialize.toast('Failed to remove endorsement. Make sure you are the instructor who gave the endorsement', 3000);
      }
    );
  }

  createEmailTutorModalComponent(emailTutorData: DataNeededToFormEmailToTutor) {
    this.dynamicEmailTutorComponentGenerator.destroyComponentIfExists();
    this.dynamicEmailTutorComponentGenerator.createComponent();
    this.dynamicEmailTutorComponentGenerator.getComponentInstance().emailTutorData = emailTutorData;
    this.dynamicEmailTutorComponentGenerator.addComponentToDom();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
