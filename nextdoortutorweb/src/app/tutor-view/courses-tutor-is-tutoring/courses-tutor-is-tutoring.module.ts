import { NgModule } from '@angular/core';
import { CoursesTutorIsTutoringComponent } from './courses-tutor-is-tutoring.component';
import { CourseTutorIsTutoringModalComponent } from './course-tutor-is-tutoring-modal/course-tutor-is-tutoring-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CoursesTutorIsTutoringComponent,
    CourseTutorIsTutoringModalComponent
  ],
  entryComponents: [CourseTutorIsTutoringModalComponent],
  imports: [
    SharedModule
  ],
  exports: [CoursesTutorIsTutoringComponent]
})
export class CoursesTutorIsTutoringModule {

}
