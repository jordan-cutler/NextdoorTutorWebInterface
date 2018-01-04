import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() user: User;
  profilePhotoRoute: string;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    if (this.user.profilePhotoId) {
      this.profilePhotoRoute = this.imageService.getNewProfilePhotoUrlForCurrentUser();
    }
  }

}
