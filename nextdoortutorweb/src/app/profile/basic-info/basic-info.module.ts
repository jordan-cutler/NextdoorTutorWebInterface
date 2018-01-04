import { SharedModule } from '../../shared/shared.module';
import { BasicInfoComponent } from './basic-info.component';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BasicInfoComponent,
    CropImageModalComponent
  ],
  entryComponents: [CropImageModalComponent],
  imports: [
    SharedModule
  ],
  exports: [BasicInfoComponent]
})
export class BasicInfoModule {

}
