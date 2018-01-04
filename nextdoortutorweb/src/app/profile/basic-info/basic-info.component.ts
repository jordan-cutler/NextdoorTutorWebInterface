import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { ImageService } from '../../shared/image.service';
import { CropImageService } from './crop-image-modal/crop-image.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  providers: [CropImageService]
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  @ViewChild('profilePhotoRef') profilePhotoRef: ElementRef;
  @Input() user: User;
  profilePhotoRoute: string;

  newProfilePictureUploadedSubscription: Subscription;

  constructor(private imageService: ImageService,
              private cropImageService: CropImageService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.user.profilePhotoId) {
      this.profilePhotoRoute = this.imageService.getNewProfilePhotoUrlForCurrentUser();
    }

    this.newProfilePictureUploadedSubscription =
      this.imageService.newProfilePictureUploadedEvent.subscribe(
        () => {
          console.log('made it to upload successful');
          // temporarily...
          // Materialize.toast('Successful upload! Refresh the page to see the changes', 3000);
          this.profilePhotoRef.nativeElement.src = this.imageService.getNewProfilePhotoUrlForCurrentUser()
          // this.profilePhotoRoute = this.imageService.getNewProfilePhotoUrlForCurrentUser();
          // TODO: Right now this doesn't work and we need to refresh the page to see the uploaded picture. Fix
          this.cd.detectChanges();
        }
      );
  }

  profilePhotoFileChange(event: Event) {
    const target: any = event.target;
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.cropImageService.sendMessageToOpenModal(file);
    }
    target.value = null;
  }

  ngOnDestroy() {
    this.newProfilePictureUploadedSubscription.unsubscribe();
  }
}
