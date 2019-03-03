import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewService } from '../../services/photo-view.service';
import { Image } from '../../../user/interfaces/image';
import { NgForm} from '@angular/forms';
import { AuthGlobalService } from 'src/app/services/auth-global.service';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view-modal.component.html',
  styleUrls: ['./photo-view-modal.component.css']
})
export class PhotoViewModalComponent implements OnInit {
  @Input() imageId: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public image: Image;

  /** Id авторизованого пользователя */
  public authUserId: string;

  constructor(private photoViewService: PhotoViewService, private auth: AuthGlobalService) { }

  ngOnInit() {
    this.authUserId = this.auth.getUserId;
    this.getImage();
  }

  public getImage() {
    this.photoViewService.getImage(this.imageId).subscribe((image: Image) => {
      this.image = image;
      console.log(this.image);
    });
  }

  /**
   * Закрытие модального окна
   */
  public closeModal() {
    this.onClose.emit();
  }

  /**
   * Изменить заголовок и описание изображения
   */
  public onSubmit() {  }

  /**
   * Добавить комментарий к изображению
   */
  public onAddComment() {  }
}
