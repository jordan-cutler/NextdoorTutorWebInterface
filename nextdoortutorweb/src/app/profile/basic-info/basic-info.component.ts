import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { ImageService } from '../../shared/image.service';
import { Subscription } from 'rxjs/Subscription';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  @ViewChild('profilePhotoRef') profilePhotoRef: ElementRef;
  @Input() user: User;
  profilePhotoRoute: string;

  newProfilePictureUploadedSubscription: Subscription;

  cropImageModalFactory: ComponentFactory<CropImageModalComponent>;
  cropImageModalComponent: ComponentRef<CropImageModalComponent>;

  constructor(private imageService: ImageService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.user.profilePhotoId) {
      this.profilePhotoRoute = this.imageService.getNewProfilePhotoUrlForCurrentUser();
    }

    this.cropImageModalFactory = this.componentFactoryResolver.resolveComponentFactory(CropImageModalComponent);
  }

  profilePhotoFileChange(event: Event) {
    const target: any = event.target;
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.createCropImageComponent(file);
    }
    target.value = null;
  }

  createCropImageComponent(file: File) {
    if (this.cropImageModalComponent) {
      this.cropImageModalComponent.destroy();
    }
    this.cropImageModalComponent = this.viewContainerRef.createComponent(this.cropImageModalFactory);
    this.cropImageModalComponent.instance.file = file;
    this.newProfilePictureUploadedSubscription =
      this.cropImageModalComponent.instance.successfulUploadImageEvent.subscribe(
        () => {
          this.profilePhotoRef.nativeElement.src = this.imageService.getNewProfilePhotoUrlForCurrentUser();
        }
      );
    this.cropImageModalComponent.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.newProfilePictureUploadedSubscription) {
      this.newProfilePictureUploadedSubscription.unsubscribe();
    }
  }
}
