import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CropImageService } from './crop-image.service';
import { ImageService } from '../../../shared/image.service';
import { PreloaderService } from '../../../shared/preloader/preloader.service';

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.css']
})
export class CropImageModalComponent implements OnInit, AfterViewInit, OnDestroy {
  imageSrc = '#';
  modalId = 'cropImageModal';
  modalSelector = '#' + this.modalId;

  imagePreviewId = 'imagePreview';
  imagePreviewSelector = '#' + this.imagePreviewId;

  private $cropImage;
  private profileImageUploadedSubscription: Subscription;

  constructor(private cropImageService: CropImageService,
              private imageService: ImageService,
              private cd: ChangeDetectorRef,
              private zone: NgZone,
              private preloaderService: PreloaderService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.profileImageUploadedSubscription = this.cropImageService.getProfileImageUploadedSubject().subscribe(
      (file: File) => this.openCropperModal(file)
    );
  }

  openCropperModal(file: File) {
    this.zone.run(() => {
      console.log(file);
      $(this.modalSelector).modal(); // this line must be present
      $(this.modalSelector).modal('open');
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.$cropImage = $(this.imagePreviewSelector);
        this.$cropImage.attr('src', e.target.result);
        this.cd.detectChanges();
        (this.$cropImage as any).cropper({
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          autoCropArea: 0.65,
          restore: false,
          guides: false,
          highlight: false,
          background: false,
          cropBoxMovable: false,
          cropBoxResizable: false,
          minContainerHeight: 300,
          minContainerWidth: 200,
          minCanvasHeight: 200,
          minCanvasWidth: 200
        });
        this.cd.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  saveImage() {
    (this.$cropImage as any).cropper('getCroppedCanvas', {
      width: 168,
      height: 168,
    }).toBlob((blob: Blob) => {
      this.preloaderService.show();
      this.imageService.uploadProfilePictureToServer(blob).subscribe(
        () => {
          this.preloaderService.hide();
          this.imageService.newProfilePictureUploadedEvent.next();
        },
        (error) => {
          this.preloaderService.hide();
          if (error.responseJSON.description === 'Must be less than 5 MB in size') {
            Materialize.toast('Please upload a file with size < 5MB', 3000);
          } else {
            Materialize.toast('Failed to upload new profile image. Try again later.', 3000);
          }
        }
      );
    });
  }

  ngOnDestroy() {
    this.profileImageUploadedSubscription.unsubscribe();
  }

}
