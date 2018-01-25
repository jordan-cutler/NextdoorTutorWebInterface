import { NgModule } from '@angular/core';
import { TutorViewComponent } from './tutor-view.component';
import { SharedModule } from '../shared/shared.module';
import { TutorBasicInfoComponent } from './tutor-basic-info/tutor-basic-info.component';
import { CoursesTutorIsTutoringModule } from './courses-tutor-is-tutoring/courses-tutor-is-tutoring.module';
import { TutorReviewService } from '../shared/tutor/reviews/tutor-review.service';

@NgModule({
  declarations: [
    TutorViewComponent,
    TutorBasicInfoComponent,
  ],
  imports: [
    CoursesTutorIsTutoringModule,
    SharedModule
  ],
  providers: [TutorReviewService]
})
export class TutorViewModule {

}
