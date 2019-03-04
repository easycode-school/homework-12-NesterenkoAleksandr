import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../interfaces/comment';
import { OnCommentAnswer } from '../../interfaces/OnCommentAnswer';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form-comment',
  templateUrl: './form-comment.component.html',
  styleUrls: ['./form-comment.component.css']
})
export class FormCommentComponent implements OnInit {
  @Input() isEdit: boolean;

  /** Идентификатор изображения */
  @Input() imageId: string;

  /** Текущий комментарий */
  @Input() comment: Comment;

  /** Идентификатор комментария */
  @Input() commentId: string;

  /** Событие "Комментарий Добавлен/Изменен" */
  @Output() commentChanged: EventEmitter<any> = new EventEmitter();

  /** Событие "Добавление/изменение комментариев отменено" */
  @Output() changeCanceled: EventEmitter<any> = new EventEmitter();

  constructor(private commentsService: CommentsService, private messageService: MessageService) { }

  ngOnInit() {
    this.comment = Object.assign({}, this.comment);
  }

  /**
   * Добавить комментарий к изображению
   */
  public addComment() {
    this.commentsService.addComment(this.imageId, this.comment.text).subscribe(
      (response: OnCommentAnswer) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});

        if (!response.error) {
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }

  /**
   * Изменить комментарий к изображению
   */
  public editComment() {
    this.commentsService.editComment(this.comment._id, this.comment.text).subscribe(
      (response: OnCommentAnswer) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});

        if (!response.error) {
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }

  /**
   * Отменить редактирование комментария
   */
  public cancel() {
    this.isEdit = false;
    this.comment = Object.assign({});
    this.changeCanceled.emit();
  }
}


