import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadPhotosService } from '../../services/upload-photos.service';
import {MessageService} from 'primeng/api';
import { OnServerAnswer } from '../../interfaces/OnServerAnswer';

@Component({
  selector: 'app-upload-photos-modal',
  templateUrl: './upload-photos-modal.component.html',
  styleUrls: ['./upload-photos-modal.component.css']
})
export class UploadPhotosModalComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onUploadEnd: EventEmitter<any> = new EventEmitter();

  /** Массив для хранения, выбранных загрузки, фотографий */
  public photosArray = [];

  constructor(private uploadPhotosService: UploadPhotosService, private messageService: MessageService) { }

  ngOnInit() {
  }

  /** Закрыть модальное окно */
  public closeModal() {
    this.onClose.emit();
  }

  /**
   * Добавить фотографию в массив для загрузки на сервер
   * @param input - элемент для выбора фотографии
   */
  public addPhotos(input) {
    this.photosArray = this.photosArray.concat(...input.files);
  }

  /**
   * Удалить фотографию из массива для загрузки на сервер
   * @param name - имя файла
   */
  public deletePhoto(name) {
    this.photosArray = this.photosArray.filter((photo) => photo.name !== name);
  }

  /**
   * Загрузить выбранные фотографии на сервер
   */
  public uploadPhotos() {
    this.uploadPhotosService.uploadPhotos(this.photosArray).subscribe(
    (response: OnServerAnswer) => {
      this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
      if (!response.error) {
        this.onUploadEnd.emit();
      }
    },
    (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }
}
