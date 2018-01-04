import { SharedModule } from '../../shared/shared.module';
import { BasicInfoComponent } from './basic-info.component';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { NgModule } from '@angular/core';
import { EditBasicInfoModalComponent } from './edit-basic-info-modal/edit-basic-info-modal.component';

@NgModule({
  declarations: [
    BasicInfoComponent,
    CropImageModalComponent,
    EditBasicInfoModalComponent,
  ],
  entryComponents: [CropImageModalComponent, EditBasicInfoModalComponent],
  imports: [
    SharedModule
  ],
  exports: [BasicInfoComponent]
})
export class BasicInfoModule {

}
