import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../interfaces/image';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile-images',
  templateUrl: './user-profile-images.component.html',
  styleUrls: ['./user-profile-images.component.css']
})
export class UserProfileImagesComponent implements OnInit {
  /** Id пользователя, данные которого просматриваются  */
  @Input() userId: string;

  /** Id авторизованого пользователя */
  @Input() authUserId: string;

  /** Массив изображений пользователя */
  public images: Image[];

  public uploadPhotosModalIsOpened = false;
  public photoViewModalIsOpened = false;

  public currentImageId: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getImages();
  }

  /**
   * Получить ac сервера фотографии пользователя
   */
  public getImages() {
    this.userService.getUserImages(this.userId).subscribe(
    (images: Image[]) => {
      this.images = images;
    });
  }

  public showPhotoViewModal(imageId: string) {
    this.currentImageId = imageId;
    this.photoViewModalIsOpened = true;
  }

}
