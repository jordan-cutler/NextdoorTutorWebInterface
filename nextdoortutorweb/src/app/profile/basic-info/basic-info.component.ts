import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { Subscription } from 'rxjs/Subscription';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { EditBasicInfoModalComponent } from './edit-basic-info-modal/edit-basic-info-modal.component';
import { UserSessionService } from '../../shared/user-session/user-session.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @ViewChild('profilePhotoRef') profilePhotoRef: ElementRef;
  @Input() user: User;
  hasProfilePhoto: boolean;

  private userUpdatedSubscription: Subscription;

  private cropImageModalFactory: ComponentFactory<CropImageModalComponent>;
  private cropImageModalComponent: ComponentRef<CropImageModalComponent>;

  private editBasicInfoModalFactory: ComponentFactory<EditBasicInfoModalComponent>;
  private editBasicInfoModalComponent: ComponentRef<EditBasicInfoModalComponent>;

  constructor(private userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.user.profilePhotoId) {
      this.hasProfilePhoto = true;
    }
    this.userUpdatedSubscription = this.userSessionService.getCurrentUserObservable().subscribe(
      (user: User) => {
        this.user = user;
      }
    );

    this.cropImageModalFactory = this.componentFactoryResolver.resolveComponentFactory(CropImageModalComponent);
    this.editBasicInfoModalFactory = this.componentFactoryResolver.resolveComponentFactory(EditBasicInfoModalComponent);
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
    this.cropImageModalComponent.changeDetectorRef.detectChanges();
  }

  createEditBasicInfoComponent() {
    if (this.editBasicInfoModalComponent) {
      this.editBasicInfoModalComponent.destroy();
    }
    this.editBasicInfoModalComponent = this.viewContainerRef.createComponent(this.editBasicInfoModalFactory);
    this.editBasicInfoModalComponent.instance.user = this.user;
    this.editBasicInfoModalComponent.changeDetectorRef.detectChanges();
  }

}
