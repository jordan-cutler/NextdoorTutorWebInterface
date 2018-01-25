import { NgModule } from '@angular/core';
import { TutorApplicationComponent } from './tutor-application.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TutorApplicationComponent],
  imports: [
    SharedModule
  ]
})
export class TutorApplicationModule {

}
