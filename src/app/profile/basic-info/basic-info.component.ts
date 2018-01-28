import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '@shared/user/user-model/user.model';
import { Subscription } from 'rxjs/Subscription';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { EditBasicInfoModalComponent } from './edit-basic-info-modal/edit-basic-info-modal.component';
import { UserSessionService } from '@shared/user-session/user-session.service';
import { DynamicComponentGenerator } from '@shared/dynamic-component-generator';
import { BasicTutorInfo } from '@shared/tutor/reviews/basic-tutor-info.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  @Input() basicInfo: BasicTutorInfo;
  user: User;
  hasProfilePhoto: boolean;

  private userUpdatedSubscription: Subscription;

  private dynamicCropImageComponentGenerator: DynamicComponentGenerator<CropImageModalComponent>;
  private dynamicEditBasicInfoComponentGenerator: DynamicComponentGenerator<EditBasicInfoModalComponent>;

  constructor(private userSessionService: UserSessionService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.user = this.basicInfo.user;
    this.hasProfilePhoto = !!this.user.profilePhotoId;
    this.userUpdatedSubscription = this.userSessionService.getCurrentUserObservable().subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.dynamicCropImageComponentGenerator = new DynamicComponentGenerator<CropImageModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, CropImageModalComponent
    );
    this.dynamicEditBasicInfoComponentGenerator = new DynamicComponentGenerator<EditBasicInfoModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, EditBasicInfoModalComponent
    );

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
    this.dynamicCropImageComponentGenerator.destroyComponentIfExists();
    this.dynamicCropImageComponentGenerator.createComponent();
    this.dynamicCropImageComponentGenerator.getComponentInstance().file = file;
    this.dynamicCropImageComponentGenerator.addComponentToDom();
  }

  createEditBasicInfoComponent() {
    this.dynamicEditBasicInfoComponentGenerator.destroyComponentIfExists();
    this.dynamicEditBasicInfoComponentGenerator.createComponent();
    this.dynamicEditBasicInfoComponentGenerator.getComponentInstance().user = this.user;
    this.dynamicEditBasicInfoComponentGenerator.addComponentToDom();
  }

}
