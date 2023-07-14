import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {
  @Input() modalData:any;
  @Output() modalClosed:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private postsService:PostsService
  ){}

  ngOnInit(): void {

  }

  onModalConfirmed(){
    this.postsService.deleteImage(this.modalData.featuredImage).subscribe({
      next: () => {
        this.postsService.deletePost(this.modalData.id).subscribe({
          next: () => this.modalClosed.emit(true)
        })
      }
    })
  }

  onModalCanceled(){
    this.modalClosed.emit(false);
  }
}
