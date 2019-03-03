import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from '../interfaces/image';
import { Images } from '../interfaces/images';

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
}
