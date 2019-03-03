import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewService } from '../../services/photo-view.service';
import { OnServerAnswer } from '../../interfaces/OnServerAnswer';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  /** Комментарий */
  @Input() comment: Comment;
  /** Id авторизованого пользователя */
  @Input() authUserId: string;

  /** Событие "Комментарий удален" */
  @Output() commentDeleted: EventEmitter<any> = new EventEmitter();

  constructor(private photoViewService: PhotoViewService) { }

  ngOnInit() {
  }

  /**
   * Удалить комментарий
   * @param commentId - идентификатор комментария
   * @param imageId - идентификатор изображения
   */
  public deleteComment(commentId: string, imageId: string) {
    this.photoViewService.deleteComment(commentId, imageId).subscribe(
      (response: OnServerAnswer) => {
        if (!response.error) {
          this.commentDeleted.emit();
        }
      }
    );
  }
}
