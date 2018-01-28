import { NgModule } from '@angular/core';
import { CoursesUserIsTutoringListComponent } from './courses-user-is-tutoring-list.component';
import { EditCourseTutorModalComponent } from './edit-course-tutor-modal/edit-course-tutor-modal.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CoursesUserIsTutoringListComponent,
    EditCourseTutorModalComponent
  ],
  entryComponents: [EditCourseTutorModalComponent],
  imports: [
    SharedModule
  ],
  exports: [CoursesUserIsTutoringListComponent]
})
export class CoursesUserIsTutoringModule {
}
