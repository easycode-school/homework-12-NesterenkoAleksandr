import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoViewModalComponent } from './components/photo-view-modal/photo-view-modal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './components//comment/comment.component';

@NgModule({
  declarations: [PhotoViewModalComponent, CommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    PhotoViewModalComponent
  ]
})
export class PhotoViewModalModule { }
