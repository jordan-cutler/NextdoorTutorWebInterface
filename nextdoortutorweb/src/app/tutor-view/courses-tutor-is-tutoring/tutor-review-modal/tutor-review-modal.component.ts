import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Tutor } from '../../../shared/tutor/tutor-model/tutor.model';
import { User } from '../../../shared/user/user-model/user.model';
import { TutorReviewService } from '../../../shared/tutor/reviews/tutor-review.service';
import { UserSessionService } from '../../../shared/user-session/user-session.service';
import { PreloaderService } from '../../../core/preloader/preloader.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tutor-review-modal',
  templateUrl: './tutor-review-modal.component.html',
  styleUrls: ['./tutor-review-modal.component.scss']
})
export class TutorReviewModalComponent implements OnInit, AfterViewInit {
  @Input() tutorUser: User;
  @Input() courseNumber: string;
  readonly modalId = 'courseReview';

  private readonly modalSelector = '#' + this.modalId;

  readonly validGrades = [
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
  readonly knowledgeableDropdownSelector = '#' + this.knowledgeableDropdownId;
  readonly helpfulDropdownId = 'helpfulDropdown';
  readonly helpfulDropdownSelector = '#' + this.helpfulDropdownId;
  readonly charismaticDropdownId = 'charismaticDropdown';
  readonly charismaticDropdownSelector = '#' + this.charismaticDropdownId;
  readonly overallDropdownId = 'overallDropdown';
  readonly overallDropdownSelector = '#' + this.overallDropdownId;
  readonly notesId = 'notes';
  readonly notesSelector = '#' + this.notesId;
  readonly defaultDropdownValue = 'N/A';

  constructor(private tutorReviewService: TutorReviewService,
              private preloaderService: PreloaderService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $(this.modalSelector).modal();
    $(this.modalSelector).modal('open');
    $('select').material_select();
    $('input.character-count').characterCounter();
  }

  onSubmitReview() {
    const selectedOptionSelector = 'option:selected';
    const knowledgeableGrade = $(this.knowledgeableDropdownSelector).find(selectedOptionSelector).text();
    const helpfulGrade = $(this.helpfulDropdownSelector).find(selectedOptionSelector).text();
    const charismaticGrade = $(this.charismaticDropdownSelector).find(selectedOptionSelector).text();
    const overallGrade = $(this.overallDropdownSelector).find(selectedOptionSelector).text();
    const grades = [knowledgeableGrade, helpfulGrade, charismaticGrade, overallGrade];
    if (grades.find((value: string) => value === this.defaultDropdownValue ||
        !this.validGrades.find((validGrade: string) => validGrade === value))) {
      Materialize.toast('Make sure you select an option for each of the dropdowns.', 3000);
      return false;
    }
    const notes = $(this.notesSelector).val();
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
          Materialize.toast('Failed to upload review. Please make sure you select an option for each of the dropdowns.', 4000);
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
    $(this.modalSelector).modal('close');
  }

}
