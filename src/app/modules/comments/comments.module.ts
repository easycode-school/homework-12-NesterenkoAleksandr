import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './components/comment/comment.component';
import { FormCommentComponent } from './components/form-comment/form-comment.component';
import { FormSubcommentComponent } from './components/form-subcomment/form-subcomment.component';

@NgModule({
  declarations: [CommentComponent, FormCommentComponent, FormSubcommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CommentComponent,
    FormCommentComponent
  ]
})
export class CommentsModule { }
