import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

interface ModalData{
  showModal:boolean;
  id:string;
  featuredImage:string;
}

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  postsList:Post[] = [];
  modalData:ModalData = {
    showModal: false,
    id: "",
    featuredImage: ""
  }

  constructor(
    private postsService:PostsService
  ){}

  ngOnInit(): void {
    this.onLoad()
  }

  onFeaturedClick(id:string){
    this.postsService.updateFeaturedStatus(id).subscribe({ next: () => this.onLoad() })
  }

  onStatusClick(id:string){
    this.postsService.updatePublishStatus(id).subscribe({ next: () => this.onLoad() })
  }

  onLoad():void{
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.postsList = posts;
        console.log(posts);
      }
    })
  }

  onDeleteButtonClick(id:any, featuredImage:any){
    this.modalData.showModal = true;
    this.modalData.id = id;
    this.modalData.featuredImage = featuredImage;
  }

  onDetailsButtonClick(id:any){

  }

  onModalClosed(result:boolean){
    this.modalData.showModal = false;
    if(result){
      this.onLoad();
    }
  }
}
