import { NgModule } from '@angular/core';
import { PreloaderComponent } from './preloader/preloader.component';
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { TutorService } from '../shared/tutor/tutor.service';
import { UserService } from '../shared/user/user.service';
import { UserSessionService } from '../shared/user-session/user-session.service';
import { ImageService } from '../shared/image.service';
import { CourseService } from '../shared/course/course.service';
import { PreloaderService } from './preloader/preloader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { TutorReviewService } from '../shared/tutor/reviews/tutor-review.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    PreloaderComponent
  ],
  imports: [
    NavbarModule,
    SharedModule,
    HomeModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    NavbarComponent,
    PreloaderComponent
  ],
  providers: [
    AuthService,
    TutorService,
    UserService,
    UserSessionService,
    ImageService,
    CourseService,
    TutorReviewService,
    PreloaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function(router: Router, preloaderService: PreloaderService) {
        return new AuthInterceptor(router, preloaderService);
      },
      multi: true,
      deps: [Router, PreloaderService]
    }
  ]
})
export class CoreModule {

}
