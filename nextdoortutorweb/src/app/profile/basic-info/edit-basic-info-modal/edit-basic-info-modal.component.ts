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
  modalId = 'editBasicInfoModal';
  modalSelector = '#' + this.modalId;

  bio: string;
  major: string;

  constructor(private userService: UserService,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    this.bio = this.user.bio;
    this.major = this.user.major;
  }

  ngAfterViewInit() {
    $('input.character-count').characterCounter();
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
    setTimeout(Materialize.updateTextFields, 200);
  }

  onSubmit(event: Event) {
    this.updateBio();
    this.updateMajor();
  }

  updateBio() {
    this.userService.updateMajor(this.major).subscribe(
      (successful: boolean) => {
        if (successful) {
          this.user.major = this.major; // send updated major to parent since we were passed a reference
          this.userSessionService.userUpdatedSubject.next(this.user);
        } else {
          Materialize.toast('Failed to update bio. Try again soon.', 2500);
        }
      },
      (error) => {
        Materialize.toast('Failed to update bio. Try again soon.', 2500);
      }
    );
  }

  updateMajor() {
    this.userService.updateBio(this.bio).subscribe(
      (successful: boolean) => {
        if (successful) {
          this.user.bio = this.bio; // send updated bio to parent since we were passed a reference
          this.userSessionService.userUpdatedSubject.next(this.user);
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
