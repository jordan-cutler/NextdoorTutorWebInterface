import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '@shared/user/user-model/user.model';
import { TutorReviewService } from '@shared/tutor/reviews/tutor-review.service';
import { PreloaderService } from '@app/core/preloader/preloader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-tutor-review-modal',
  templateUrl: './tutor-review-modal.component.html',
  styleUrls: ['./tutor-review-modal.component.scss']
})
export class TutorReviewModalComponent implements OnInit, AfterViewInit {
  @ViewChild('reviewForm') reviewForm: NgForm;
  @Input() tutorUser: User;
  @Input() courseNumber: string;
  readonly modalId = 'courseReview';

  modalActions = new EventEmitter<string|MaterializeAction>();

  readonly validReviewGrades = [
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-',
    'D',
    'F'
  ];

  readonly knowledgeableDropdownId = 'knowledgeableDropdown';
  readonly helpfulDropdownId = 'helpfulDropdown';
  readonly charismaticDropdownId = 'charismaticDropdown';
  readonly overallDropdownId = 'overallDropdown';
  readonly notesId = 'notes';

  selectedDropdownValue: string;
  defaultDropdownValue: string;

  constructor(private tutorReviewService: TutorReviewService,
              private preloaderService: PreloaderService) { }

  ngOnInit() {
    this.defaultDropdownValue = 'N/A';
    this.selectedDropdownValue = this.defaultDropdownValue;
  }

  ngAfterViewInit() {
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  onSubmitReview() {
    const controls = this.reviewForm.form.controls;
    const knowledgeableGrade = controls['knowledgeableGrade'].value;
    const helpfulGrade = controls['helpfulGrade'].value;
    const charismaticGrade = controls['charismaticGrade'].value;
    const overallGrade = controls['overallGrade'].value;
    const notes = controls['notes'].value;
    const grades = [knowledgeableGrade, helpfulGrade, charismaticGrade, overallGrade];
    if (grades.find((value: string) => value === this.defaultDropdownValue ||
        !this.validReviewGrades.find((validGrade: string) => validGrade === value))) {
      Materialize.toast('Make sure you select an option for each of the dropdowns.', 3000);
      return false;
    }
    this.preloaderService.show();
    this.tutorReviewService.submitReviewForTutor(
      this.tutorUser.userId, this.courseNumber, knowledgeableGrade,
      helpfulGrade, charismaticGrade, overallGrade, notes
    ).subscribe(
      (isSuccessful: boolean) => {
        this.preloaderService.hide();
        if (isSuccessful) {
          this.tutorReviewService.sendSuccessfulReviewUploadedEvent();
          Materialize.toast('Review added successfully. Thanks!', 3000);
        } else {
          Materialize.toast('Failed to upload review. Please make sure you select an option for each of the dropdowns.', 3000);
        }
      },
      (error: HttpErrorResponse) => {
        this.preloaderService.hide();
        if (error.error.description === 'Cannot submit more than 1 review per day per tutor per course') {
          Materialize.toast('You may only upload 1 review per day per tutor per course', 3000);
        } else {
          Materialize.toast('Failed to upload review. Please make sure you select an option for each of the dropdowns.', 4000);
        }
      }
    );
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

}
