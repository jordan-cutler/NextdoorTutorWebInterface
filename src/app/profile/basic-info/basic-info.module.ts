import { SharedModule } from '@shared/shared.module';
import { BasicInfoComponent } from './basic-info.component';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { NgModule } from '@angular/core';
import { EditBasicInfoModalComponent } from './edit-basic-info-modal/edit-basic-info-modal.component';
import { CropImageService } from './crop-image-modal/crop-image.service';
import { ProfileImageDirective } from './profile-image.directive';

@NgModule({
  declarations: [
    BasicInfoComponent,
    CropImageModalComponent,
    EditBasicInfoModalComponent,
    ProfileImageDirective
  ],
  entryComponents: [CropImageModalComponent, EditBasicInfoModalComponent],
  imports: [
    SharedModule
  ],
  providers: [CropImageService],
  exports: [BasicInfoComponent]
})
export class BasicInfoModule {

}
