import { NgModule } from '@angular/core';
import { TermsAndConditionsModalComponent } from './terms-and-conditions-modal/terms-and-conditions-modal.component';
import { ContactUsModalComponent } from './contact-us-modal/contact-us-modal.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    ContactUsModalComponent,
    TermsAndConditionsModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class HomeModule {
}
