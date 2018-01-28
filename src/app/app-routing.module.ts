import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@core/home/home.component';
import { FindTutorComponent } from './find-tutor/find-tutor.component';
import { AuthGuard } from './auth/auth-guard.service';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
import { ProfileComponent } from '@profile/profile.component';
import { TutorViewComponent } from './tutor-view/tutor-view.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'findtutor', component: FindTutorComponent, canActivate: [AuthGuard] },
  { path: 'tutorapplication', component: TutorApplicationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'tutorview/:emailId', component: TutorViewComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

