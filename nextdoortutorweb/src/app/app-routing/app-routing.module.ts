import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorsearchComponent } from '../tutorsearch/tutorsearch.component';
import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tutorsearch', component: TutorsearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

