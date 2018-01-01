import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorsearchComponent } from '../tutor-search/tutor-search.component';
import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tutor-search', component: TutorsearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

