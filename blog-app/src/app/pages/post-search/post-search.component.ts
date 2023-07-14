import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss']
})
export class PostSearchComponent implements OnInit {
  searchTerm!:string;
  postsList:any[] = [];

  constructor(
    private postsService:PostsService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchTerm = params.get('keyword')!;

      if(this.searchTerm){
        this.postsService.searchPosts(this.searchTerm).subscribe({
          next: (posts) => {
            this.postsList = posts;
          }
        })
      }
    })
  }
}
