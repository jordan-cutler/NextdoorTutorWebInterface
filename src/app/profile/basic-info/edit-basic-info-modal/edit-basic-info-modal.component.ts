import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '@shared/user/user-model/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '@shared/user/user.service';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { Observable } from 'rxjs/Observable';
import { ProfilePageLink, Site } from '@shared/user/user-model/profile-page-link.model';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-edit-basic-info-modal',
  templateUrl: './edit-basic-info-modal.component.html',
  styleUrls: ['./edit-basic-info-modal.component.scss']
})
export class EditBasicInfoModalComponent implements OnInit, AfterViewInit {
  @ViewChild('editBasicInfoForm') basicInfoForm: NgForm;
  @Input() user: User;
  readonly modalId = 'editBasicInfoModal';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private userService: UserService,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {
    const value = this.basicInfoForm.value;
    const controls = this.basicInfoForm.controls;
    const githubControl = controls['github'];
    const facebookControl = controls['facebook'];
    const linkedinControl = controls['linkedin'];
    const bio: string = value.bio;
    const major: string = value.major;
    const github: string = value.github;
    const facebook: string = value.facebook;
    const linkedin: string = value.linkedin;
    this.updateBio(bio);
    this.updateMajor(major);


    if (!githubControl.valid) {
      Materialize.toast('Your GitHub link must follow the proper format of https://www.github.com/[YourGitHubUserName]', 3000);
      return false;
    }

    if (!facebookControl.valid) {
      Materialize.toast('Your Facebook link must follow the proper format of https://www.facebook.com/[YourFacebookUserName]', 3000);
      return false;
    }

    if (!linkedinControl.valid) {
      Materialize.toast('Your LinkedIn link must follow the proper format of https://www.linkedin.com/[YourLinkedInUserName]', 3000);
      return false;
    }
    if (githubControl.dirty) {
      this.updateGithub(github);
    }
    if (facebookControl.dirty) {
      this.updateFacebook(facebook);
    }
    if (linkedinControl.dirty) {
      this.updateLinkedin(linkedin);
    }
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  updateMajor(major: string) {
    this.updateField('major',
      () => this.userService.updateMajor(major),
      () => { this.user.major = major; });
  }

  updateBio(bio: string) {
    this.updateField('bio',
      () => this.userService.updateBio(bio),
      () => { this.user.bio = bio; });
  }

  updateGithub(github: string) {
    this.updateField('GitHub',
      () => this.userService.updateGithub(github),
      () => { this.user.github = new ProfilePageLink(github, Site.GITHUB); });
  }

  updateFacebook(facebook: string) {
    this.updateField('Facebook',
      () => this.userService.updateFacebook(facebook),
      () => { this.user.facebook = new ProfilePageLink(facebook, Site.FACEBOOK); });
  }

  updateLinkedin(linkedin: string) {
    this.updateField('LinkedIn',
      () => this.userService.updateLinkedin(linkedin),
      () => { this.user.linkedin = new ProfilePageLink(linkedin, Site.LINKEDIN); });
  }

  updateField(fieldName: string,
              serviceFunction: () => Observable<boolean>,
              updateUserFunction: () => void) {
    serviceFunction().subscribe(
      (successful: boolean) => {
        if (successful) {
          updateUserFunction();
          this.userSessionService.updateStoredUser(this.user);
        } else {
          Materialize.toast('Failed to update ' + fieldName + '. Try again soon.', 3000);
        }
      },
      (error) => {
        Materialize.toast('Failed to update ' + fieldName + '. Try again soon.', 3000);
      }
    );
  }
}
