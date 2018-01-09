import {
  AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit,
  ViewContainerRef
} from '@angular/core';
import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';
import { ImageService } from '../../shared/image.service';
import { UserSessionService } from '../../shared/user-session/user-session.service';
import { EmailTutorService } from './email-tutor-modal/email-tutor.service';
import { DataNeededToFormEmailToTutor } from './email-tutor-modal/DataNeededToFormEmailToTutor';
import { EmailTutorModalComponent } from './email-tutor-modal/email-tutor-modal.component';
import { Grade } from '../../shared/tutor/tutor-model/grade.model';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit, AfterViewInit {
  @Input() tutors: Tutor[];

  currentUserId: string;

  emailTutorModalFactory: ComponentFactory<EmailTutorModalComponent>;
  emailTutorModalComponent: ComponentRef<EmailTutorModalComponent>;

  currentlySortingBy: string;
  ascendingOrDescending: string;

  constructor(public imageService: ImageService,
              public userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.currentUserId = this.userSessionService.getCurrentUser().userId;
    this.emailTutorModalFactory = this.componentFactoryResolver.resolveComponentFactory(EmailTutorModalComponent);
    this.sortByHourlyRateAscending();
    this.currentlySortingBy = 'hourlyRate';
    this.ascendingOrDescending = 'ascending';
  }

  sortByHourlyRateAscending() {
    this.tutors.sort((a: Tutor, b: Tutor) => {
      return a.hourlyRate - b.hourlyRate;
    });
  }

  sortByHourlyRateDescending() {
    this.tutors.sort((a: Tutor, b: Tutor) => {
      return b.hourlyRate - a.hourlyRate;
    });
  }

  sortByGradeAscending() {
    this.tutors.sort((a: Tutor, b: Tutor) => {
      return Grade.getRank(new Grade(b.grade)) - Grade.getRank(new Grade(a.grade));
    });
  }

  sortByGradeDescending() {
    this.tutors.sort((a: Tutor, b: Tutor) => {
      return Grade.getRank(new Grade(a.grade)) - Grade.getRank(new Grade(b.grade));
    });
  }

  sortAscending() {
    this.ascendingOrDescending = 'ascending';
    if (this.currentlySortingBy === 'hourlyRate') {
      this.sortByHourlyRateAscending();
    } else if (this.currentlySortingBy === 'grade') {
      this.sortByGradeAscending();
    }
  }

  sortDescending() {
    this.ascendingOrDescending = 'descending';
    if (this.currentlySortingBy === 'hourlyRate') {
      this.sortByHourlyRateDescending();
    } else if (this.currentlySortingBy === 'grade') {
      this.sortByGradeDescending();
    }
  }

  onSortByHourlyRateClick() {
    this.currentlySortingBy = 'hourlyRate';
    if (this.ascendingOrDescending === 'ascending') {
      this.sortByHourlyRateAscending();
    } else if (this.ascendingOrDescending === 'descending') {
      this.sortByHourlyRateDescending();
    }
  }

  onSortByGradeClick() {
    this.currentlySortingBy = 'grade';
    if (this.ascendingOrDescending === 'ascending') {
      this.sortByGradeAscending();
    } else if (this.ascendingOrDescending === 'descending') {
      this.sortByGradeDescending();
    }
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

  createEmailTutorModalComponent(emailTutorData: DataNeededToFormEmailToTutor) {
    if (this.emailTutorModalComponent) {
      this.emailTutorModalComponent.destroy();
    }
    this.emailTutorModalComponent = this.viewContainerRef.createComponent(this.emailTutorModalFactory);
    this.emailTutorModalComponent.instance.emailTutorData = emailTutorData;
    this.emailTutorModalComponent.changeDetectorRef.detectChanges();
  }
}
