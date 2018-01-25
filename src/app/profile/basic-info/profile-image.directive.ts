import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../shared/image.service';
import { CropImageService } from './crop-image-modal/crop-image.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appProfileImage]'
})
export class ProfileImageDirective implements OnInit {
  @Input() userIdUnderProfilePhoto: string;
  @Input() askerId: string;

  successfulImageUploadSubscription: Subscription;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private httpClient: HttpClient,
              private imageService: ImageService,
              private cropImageService: CropImageService) {
  }

  ngOnInit() {
    this.loadImage();
    this.successfulImageUploadSubscription = this.cropImageService.getSuccessfulImageUploadObservable().subscribe(
      () => this.loadImage()
    );
  }

  loadImage() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'src', 'assets/images/preloadergifred.gif');
    const url = this.imageService.getNewProfilePhotoUrl(this.userIdUnderProfilePhoto, this.askerId);
    this.httpClient.get(url, {
      responseType: 'blob'
    }).subscribe(
      (response) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.renderer.setAttribute(this.elementRef.nativeElement, 'src', e.target.result);
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'src', 'assets/images/account_circle_black_180x180.png');
      }
    );
  }
}
