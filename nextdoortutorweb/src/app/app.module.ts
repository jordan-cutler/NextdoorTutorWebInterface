import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { TutorService } from './shared/tutor/tutor.service';
import { UserService } from './shared/user/user.service';
import { UserSessionService } from './shared/user-session/user-session.service';
import { ImageService } from './shared/image.service';
import { CourseService } from './shared/course/course.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { SubmitBugModalComponent } from './navbar/submit-bug-modal/submit-bug-modal.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { PreloaderService } from './shared/preloader/preloader.service';
import { SharedModule } from './shared/shared.module';
import { FindTutorModule } from './find-tutor/find-tutor.module';
import { ProfileComponent } from './profile/profile.component';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
import { CoursesUserIsTutoringListComponent } from './profile/courses-user-is-tutoring-list/courses-user-is-tutoring-list.component';
import { BasicInfoComponent } from './profile/basic-info/basic-info.component';
import { CropImageModalComponent } from './profile/basic-info/crop-image-modal/crop-image-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SubmitBugModalComponent,
    PreloaderComponent,
    ProfileComponent,
    TutorApplicationComponent,
    CoursesUserIsTutoringListComponent,
    BasicInfoComponent,
    CropImageModalComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MaterializeModule,
    AppRoutingModule,
    HttpClientModule,
    FindTutorModule
  ],
  providers: [
    AuthService,
    TutorService,
    UserService,
    UserSessionService,
    ImageService,
    CourseService,
    PreloaderService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
