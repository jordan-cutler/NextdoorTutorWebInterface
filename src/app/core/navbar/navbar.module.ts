import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { SubmitBugModalComponent } from './submit-bug-modal/submit-bug-modal.component';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from '@app/app-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SubmitBugModalComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
