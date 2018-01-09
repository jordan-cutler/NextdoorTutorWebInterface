import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../../shared/image.service';
import { PreloaderService } from '../../../core/preloader/preloader.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.css']
})
export class CropImageModalComponent implements OnInit, AfterViewInit {
  @Input() file: File;
  readonly modalId = 'cropImageModal';
  private readonly modalSelector = '#' + this.modalId;

  readonly imagePreviewId = 'imagePreview';
  private readonly imagePreviewSelector = '#' + this.imagePreviewId;

  private $cropImage;

  private successfulUploadImageEvent = new Subject();

  constructor(private imageService: ImageService,
              private cd: ChangeDetectorRef,
              private preloaderService: PreloaderService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.openCropperModal();
  }

  openCropperModal() { // file: File) {
      $(this.modalSelector).modal(); // this line must be present
      $(this.modalSelector).modal('open');
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
          this.successfulUploadImageEvent.next();
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

  getSuccessfulImageUploadObservable(): Observable<any> {
    return this.successfulUploadImageEvent.asObservable();
  }

}
