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


@NgModule({
  declarations: [
    AppComponent,
    TutorsearchComponent,
    LoginComponent
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
