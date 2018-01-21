import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TutorReviewService } from '../shared/tutor/reviews/tutor-review.service';
import { BasicTutorInfo } from '../shared/tutor/reviews/basic-tutor-info.model';

@Component({
  selector: 'app-tutor-view',
  templateUrl: './tutor-view.component.html',
  styleUrls: ['./tutor-view.component.scss']
})
export class TutorViewComponent implements OnInit, OnDestroy {
  tutorEmail: string;
  basicTutorInfo: BasicTutorInfo;

  paramsSubscription: Subscription;
  tutorDataSubscription: Subscription;
  successfulReviewSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private tutorReviewService: TutorReviewService) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.tutorEmail = params['emailId'] + '@lehigh.edu';
        this.updateBasicTutorInfo(this.tutorEmail);
      }
    );
    this.successfulReviewSubscription = this.tutorReviewService.getSuccessfulReviewUploadedObservable().subscribe(
      () => this.updateBasicTutorInfo(this.tutorEmail)
    );
  }

  updateBasicTutorInfo(email: string) {
    this.tutorDataSubscription =
      this.tutorReviewService.getBasicTutorInfo(email).subscribe(
        (basicTutorInfo: BasicTutorInfo) => this.basicTutorInfo = basicTutorInfo
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    if (this.tutorDataSubscription) {
      this.tutorDataSubscription.unsubscribe();
    }
    if (this.successfulReviewSubscription) {
      this.successfulReviewSubscription.unsubscribe();
    }
  }

}
