import { NgModule } from '@angular/core';
import { TutorViewComponent } from './tutor-view.component';
import { SharedModule } from '../shared/shared.module';
import { TutorBasicInfoComponent } from './tutor-basic-info/tutor-basic-info.component';
import { CoursesTutorIsTutoringComponent } from './courses-tutor-is-tutoring/courses-tutor-is-tutoring.component';

@NgModule({
  declarations: [
    TutorViewComponent,
    TutorBasicInfoComponent,
    CoursesTutorIsTutoringComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TutorViewModule {

}
