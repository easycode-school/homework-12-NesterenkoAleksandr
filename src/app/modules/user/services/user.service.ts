import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../interfaces/image';
import { Images } from '../interfaces/images';
import { ServerResponse } from '../../../interfaces/server-response';


@Injectable()
export class UserService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Получить данные пользователя по его Id
   * @param id - идентификатор пользователя
   */
  public getUserInfo(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/public/users/get-info/${id}`);
  }

  /**
   * Получить все изображения пользователя
   * @param id - идентификатор пользователя
   */
  public getUserImages(id: string): Observable<Array<Image>> {
    return this.http.get<Images>(`${this.apiUrl}/public/users/my-images/${id}`).pipe(
      map((data: Images) => {
        return data.images;
      })
    );
  }

  /**
   * Удалить изображение
   * @param userId - идентификатор пользователя
   * @param imageId - идентификатор изображения
   * @param imageUrl - адресс изображения
   */
  public removeUserImage(userId: string, imageId: string, imageUrl: string): Observable<ServerResponse> {
    const options = {
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        image_id: imageId,
        image_url: imageUrl
      })
    };

    return this.http.delete<ServerResponse>(`${this.apiUrl}/public/users/remove-photo/${userId}`, options);
  }

  /**
   * Получить избранные изображения пользователя
   * @param userId - идентификатор пользователя
   * @param part -
   * @param limit -
   */
  public getUserFavorites(userId: string, part: number = 1, limit: number = 20): Observable<Array<Image>> {
    return this.http.get<Images>(`${this.apiUrl}/public/users/my-favorites/${userId}?part=${part}&limit=${limit}`).pipe(
      map((data: Images) => {
        return data.images;
      })
    );
  }
}
