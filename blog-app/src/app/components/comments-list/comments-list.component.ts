import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  commentsList:any[] = [];
  @Input() postId!:string;

  constructor(
    private commentsService:CommentsService
  ){}

  ngOnInit(): void {
    if(this.postId.length !== 0) this.onCommentLoad()
    this.commentsService.reloadComments$.subscribe(() => this.onCommentLoad())
  }

  onCommentLoad(){
    this.commentsService.getComments(this.postId).subscribe({ next: (comments) => this.commentsList = comments })
  }
}
