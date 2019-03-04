import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../interfaces/comment';
import { OnCommentAnswer } from '../../interfaces/OnCommentAnswer';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form-subcomment',
  templateUrl: './form-subcomment.component.html',
  styleUrls: ['./form-subcomment.component.css']
})
export class FormSubcommentComponent implements OnInit {
  /** Текущий комментарий */
  @Input() comment: Comment;

  /** Идентификатор родительского комментария */
  @Input() commentId: string;

  /** Событие "Комментарий Добавлен" */
  @Output() commentChanged: EventEmitter<any> = new EventEmitter();

  /** Событие "Добавление комментария отменено" */
  @Output() changeCanceled: EventEmitter<any> = new EventEmitter();

  constructor(private commentsService: CommentsService, private messageService: MessageService) { }

  ngOnInit() {
    this.comment = Object.assign({});
  }

  /**
   * Добавление подкомментария
   */
  public addSubComment() {
    // '5c7d20454636a5002ab53fc5'
    this.commentsService.addSubComment(this.commentId, this.comment.text).subscribe(
      (response: OnCommentAnswer) => {
        this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});
        if (!response.error) {
          this.commentChanged.emit();
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    );
  }

  public editSubComment() {
    // this.commentsService.editComment(this.comment._id, this.comment.text).subscribe(
    //   (response: OnCommentAnswer) => {
    //     this.messageService.add({severity: response.error ? 'error' : 'success', summary: 'Message:', detail: response.message});

    //     if (!response.error) {
    //       this.commentChanged.emit();
    //     }
    //   },
    //   (error) => this.messageService.add({severity: 'error', summary: 'Error Message:', detail: error.message})
    // );
  }

  /**
   * Отменить редактирование комментария
   */
  public cancel() {
    this.comment = Object.assign({});
    this.changeCanceled.emit();
  }

}
