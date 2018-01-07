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

  constructor(public imageService: ImageService,
              public userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.currentUserId = this.userSessionService.getCurrentUser().userId;
    this.emailTutorModalFactory = this.componentFactoryResolver.resolveComponentFactory(EmailTutorModalComponent);
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
