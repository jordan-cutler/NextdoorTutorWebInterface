import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoursesUserIsTutoringModule } from './courses-user-is-tutoring-list/courses-user-is-tutoring.module';
import { BasicInfoModule } from './basic-info/basic-info.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    BasicInfoModule,
    CoursesUserIsTutoringModule
  ],
  exports: [
    BasicInfoModule
  ]
})
export class ProfileModule {
}
