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
import { NavbarTopComponent } from './navbar/navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar/navbar-side/navbar-side.component';
import { SubmitBugModalComponent } from './navbar/submit-bug-modal/submit-bug-modal.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { PreloaderService } from './shared/preloader/preloader.service';
import { SharedModule } from './shared/shared.module';
import { EmailTutorModalComponent } from './find-tutor/tutor-list/email-tutor-modal/email-tutor-modal.component';
import { SearchBarComponent } from './find-tutor/search-bar/search-bar.component';
import { FindTutorComponent } from './find-tutor/find-tutor.component';
import { TutorListComponent } from './find-tutor/tutor-list/tutor-list.component';
import { FormsModule } from '@angular/forms';
import { EmailTutorService } from './find-tutor/tutor-list/email-tutor-modal/email-tutor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    SubmitBugModalComponent,
    PreloaderComponent,
    FindTutorComponent,
    SearchBarComponent,
    TutorListComponent,
    EmailTutorModalComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MaterializeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TutorService,
    UserService,
    UserSessionService,
    ImageService,
    CourseService,
    PreloaderService,
    EmailTutorService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
