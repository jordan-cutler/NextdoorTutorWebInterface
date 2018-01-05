import { NgModule } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FindTutorComponent } from './find-tutor.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { EmailTutorModalComponent } from './tutor-list/email-tutor-modal/email-tutor-modal.component';
import { EmailTutorService } from './tutor-list/email-tutor-modal/email-tutor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FindTutorComponent,
    SearchBarComponent,
    TutorListComponent,
    EmailTutorModalComponent
  ],
  entryComponents: [EmailTutorModalComponent],
  imports: [
    SharedModule
  ],
  providers: [EmailTutorService]
})
export class FindTutorModule {

}
