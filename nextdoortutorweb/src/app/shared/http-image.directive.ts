import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from './image.service';

@Directive({
  selector: '[appHttpImage]'
})
export class HttpImageDirective implements OnInit {
  @Input() userIdUnderProfilePhoto: string;
  @Input() askerId: string;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private httpClient: HttpClient,
              private imageService: ImageService) {
  }

  ngOnInit() {
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
