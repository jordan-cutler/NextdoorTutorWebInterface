import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { FindTutorModule } from './find-tutor/find-tutor.module';
import { CoursesUserIsTutoringModule } from '@profile/courses-user-is-tutoring-list/courses-user-is-tutoring.module';
import { ProfileModule } from '@profile/profile.module';
import { TutorApplicationModule } from './tutor-application/tutor-application.module';
import { CoreModule } from './core/core.module';
import { TutorViewModule } from './tutor-view/tutor-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MaterializeModule,
    HttpClientModule,
    CoursesUserIsTutoringModule,
    FindTutorModule,
    TutorApplicationModule,
    CoreModule,
    ProfileModule,
    TutorViewModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
