import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FindTutorComponent } from './find-tutor/find-tutor.component';
import { AuthGuard } from './auth/auth-guard.service';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'findtutor', component: FindTutorComponent, canActivate: [AuthGuard] },
  { path: 'tutorapplication', component: TutorApplicationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

