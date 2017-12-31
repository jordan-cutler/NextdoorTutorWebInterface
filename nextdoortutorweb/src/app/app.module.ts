import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';

import { GoogleSignInComponent } from 'angular-google-signin';
import { TutorsearchComponent } from './tutorsearch/tutorsearch.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInComponent,
    TutorsearchComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
