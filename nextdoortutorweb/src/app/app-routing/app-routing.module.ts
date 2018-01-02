import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../global/service/auth/auth-guard.service';
import { FindTutorComponent } from '../find-tutor/find-tutor.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'findtutor', component: FindTutorComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

