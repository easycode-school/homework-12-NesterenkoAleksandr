import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Image } from '../../user/interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class PhotoViewService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Get image by Id
   * @param id - image Id
   */
  public getImage(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/public/users/image-info/${id}`);
  }

  /**
   * Удалить комментарий
   * @param commentId - идентификатор комментария
   * @param imageId - идентификатор изображения
   */
  public deleteComment(commentId: string, imageId: string) {
    const options = {
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        image_id: imageId
      })
    };

    return this.http.delete(`${this.apiUrl}/public/users/comment/${commentId}`, options);
  }

  /**
   * Добавить комментарий к изображению
   * @param imageId - идентификатор изображения
   * @param comment - текст комментария
   */
  public addImageComment(imageId: string, comment: string) {
    return this.http.post(`${this.apiUrl}/public/users/comment/${imageId}`, {
      body: JSON.stringify({
        comment_text: comment
      })
    });
  }
}
