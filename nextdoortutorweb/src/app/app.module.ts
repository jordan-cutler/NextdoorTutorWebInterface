import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { TutorsearchComponent } from './tutor-search/tutor-search.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './global/service/auth/auth.service';
import { TutorService } from './tutor/tutor.service';
import { UserService } from './user/user.service';
import { UserSessionService } from './global/service/user-session.service';
import { ImageService } from './global/service/image.service';
import { CourseService } from './course/course.service';
import { AuthGuard } from './global/service/auth/auth-guard.service';
import { AuthInterceptor } from './global/service/auth/auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarTopComponent } from './navbar/navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar/navbar-side/navbar-side.component';
import { SubmitBugModalComponent } from './navbar/submit-bug-modal/submit-bug-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TutorsearchComponent,
    LoginComponent,
    NavbarComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    SubmitBugModalComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TutorService,
    UserService,
    UserSessionService,
    ImageService,
    CourseService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
