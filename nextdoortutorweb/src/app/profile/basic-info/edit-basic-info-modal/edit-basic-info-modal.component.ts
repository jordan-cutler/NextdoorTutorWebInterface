import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/user/user-model/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user/user.service';
import { UserSessionService } from '../../../shared/user-session/user-session.service';
import { Observable } from 'rxjs/Observable';
import { ProfilePageLink, Site } from '../../../shared/user/user-model/profile-page-link.model';

@Component({
  selector: 'app-edit-basic-info-modal',
  templateUrl: './edit-basic-info-modal.component.html',
  styleUrls: ['./edit-basic-info-modal.component.css']
})
export class EditBasicInfoModalComponent implements OnInit, AfterViewInit {
  @ViewChild('editBasicInfoForm') basicInfoForm: NgForm;
  @Input() user: User;
  readonly modalId = 'editBasicInfoModal';
  private modalSelector = '#' + this.modalId;

  constructor(private userService: UserService,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('input.character-count').characterCounter();
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {
    const value = this.basicInfoForm.value;
    const controls = this.basicInfoForm.controls;
    const bio: string = value.bio;
    const major: string = value.major;
    const github: string = value.github;
    const facebook: string = value.facebook;
    const linkedin: string = value.linkedin;
    this.updateBio(bio);
    this.updateMajor(major);

    if (!controls.github.valid) {
      Materialize.toast('Your GitHub link must at the very least include github.com', 3000);
      return false;
    }

    if (!controls.facebook.valid) {
      Materialize.toast('Your Facebook link must at the very least include facebook.com', 3000);
      return false;
    }

    if (!controls.linkedin.valid) {
      Materialize.toast('Your LinkedIn link must at the very least include linkedin.com', 3000);
      return false;
    }
    this.updateGithub(github);
    this.updateFacebook(facebook);
    this.updateLinkedin(linkedin);
    $(this.modalSelector).modal('close');
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
