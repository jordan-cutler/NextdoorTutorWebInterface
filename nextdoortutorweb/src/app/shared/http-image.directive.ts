import { Directive, ElementRef, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
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
              private imageService: ImageService,
              private zone: NgZone) {
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
          // this.cd.detectChanges();
        };
        reader.readAsDataURL(response);
      }
    );
  }
}
