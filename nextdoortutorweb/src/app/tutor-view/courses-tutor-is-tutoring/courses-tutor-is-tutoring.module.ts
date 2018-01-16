import { NgModule } from '@angular/core';
import { CoursesTutorIsTutoringComponent } from './courses-tutor-is-tutoring.component';
import { TutorReviewModalComponent } from './tutor-review-modal/tutor-review-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CoursesTutorIsTutoringComponent,
    TutorReviewModalComponent
  ],
  entryComponents: [TutorReviewModalComponent],
  imports: [
    SharedModule
  ],
  exports: [CoursesTutorIsTutoringComponent]
})
export class CoursesTutorIsTutoringModule {

}
