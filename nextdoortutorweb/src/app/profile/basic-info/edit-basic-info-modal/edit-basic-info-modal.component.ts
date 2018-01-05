import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../shared/user/user-model/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user/user.service';
import { UserSessionService } from '../../../shared/user-session/user-session.service';

@Component({
  selector: 'app-edit-basic-info-modal',
  templateUrl: './edit-basic-info-modal.component.html',
  styleUrls: ['./edit-basic-info-modal.component.css']
})
export class EditBasicInfoModalComponent implements OnInit, AfterViewInit {
  @ViewChild('form') basicInfoForm: NgForm;
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
    const bio = this.basicInfoForm.value.bio;
    const major = this.basicInfoForm.value.major;
    this.updateBio(bio);
    this.updateMajor(major);
  }

  updateMajor(major: string) {
    this.userService.updateMajor(major).subscribe(
      (successful: boolean) => {
        if (successful) {
          this.userSessionService.updateStoredUser(this.user);
        } else {
          Materialize.toast('Failed to update bio. Try again soon.', 2500);
        }
      },
      (error) => {
        Materialize.toast('Failed to update bio. Try again soon.', 2500);
      }
    );
  }

  updateBio(bio: string) {
    this.userService.updateBio(bio).subscribe(
      (successful: boolean) => {
        if (successful) {
          this.userSessionService.updateStoredUser(this.user);
        } else {
          Materialize.toast('Failed to update major. Try again soon.', 2500);
        }
      },
      (error) => {
        Materialize.toast('Failed to update major. Try again soon.', 2500);
      }
    );
  }
}
