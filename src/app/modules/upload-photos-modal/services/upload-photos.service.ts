import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthGlobalService } from 'src/app/services/auth-global.service';
import { environment } from './../../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class UploadPhotosService {
    private apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
        public authGlobalService: AuthGlobalService
    ) { }

    /**
     * Загрузить фотографии на сервер
     * @param files - фотографии
     */
    public uploadPhotos(files: Array<any>) {
        const formData = new FormData();
        files.forEach((photo) => formData.append('userPhotos', photo));

        return this.http.post(`${this.apiUrl}/public/users/upload-photos/${this.authGlobalService.getUserId}`, formData);
    }
}

