import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Tutor } from '../shared/tutor/tutor-model/tutor.model';
import { Subscription } from 'rxjs/Subscription';
import { TutorService } from '../shared/tutor/tutor.service';

@Component({
  selector: 'app-tutor-view',
  templateUrl: './tutor-view.component.html',
  styleUrls: ['./tutor-view.component.scss']
})
export class TutorViewComponent implements OnInit, OnDestroy {

  tutorEmail: string;
  tutor: Tutor;

  paramsSubscription: Subscription;
  tutorDataSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tutorService: TutorService) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.tutorEmail = params['emailId'] + '@lehigh.edu';
        this.tutorDataSubscription =
          this.tutorService.getTutorDataByEmail(this.tutorEmail).subscribe(
            (tutor: Tutor) => this.tutor = tutor
          );
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    if (this.tutorDataSubscription) {
      this.tutorDataSubscription.unsubscribe();
    }
  }

}
