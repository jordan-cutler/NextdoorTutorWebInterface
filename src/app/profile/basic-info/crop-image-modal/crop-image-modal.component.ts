import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ImageService } from '@shared/image.service';
import { PreloaderService } from '@app/core/preloader/preloader.service';
import { CropImageService } from './crop-image.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss']
})
export class CropImageModalComponent implements OnInit, AfterViewInit {
  @Input() file: File;
  readonly modalId = 'cropImageModal';
  private readonly modalSelector = '#' + this.modalId;

  readonly imagePreviewId = 'imagePreview';
  private readonly imagePreviewSelector = '#' + this.imagePreviewId;

  private $cropImage;

  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private imageService: ImageService,
              private cd: ChangeDetectorRef,
              private cropImageService: CropImageService,
              private preloaderService: PreloaderService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.openCropperModal();
  }

  openCropperModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.$cropImage = $(this.imagePreviewSelector);
      // make sure to use jquery to update otherwise it won't work
      this.$cropImage.attr('src', e.target.result);
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
    reader.readAsDataURL(this.file);
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
          this.cropImageService.sendSuccessfulImageUploadedEvent();
        },
        (error) => {
          console.log(error);
          this.preloaderService.hide();
          if (error.message === 'Must be less than 5 MB in size') {
            Materialize.toast('Please upload a file with size < 5MB', 3000);
          } else {
            Materialize.toast('Failed to upload new profile image. Try again later.', 3000);
          }
        }
      );
    });
  }

}
