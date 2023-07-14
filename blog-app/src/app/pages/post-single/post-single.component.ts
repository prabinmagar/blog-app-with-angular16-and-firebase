import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnInit {
  postId!:any;
  postData!:any;
  similarPosts:any = [];
  sanitizedHtml!:SafeHtml;

  constructor(
    private route:ActivatedRoute,
    private postsService:PostsService,
    private sanitizer:DomSanitizer
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId');

      if(this.postId){
        this.postsService.getSinglePost(this.postId).subscribe({
          next: (post) => {
            this.postData = post;
            this.sanitizedHtml = this.sanitizeHtml(this.postData?.content);
            this.postsService.countViews(this.postData.id).subscribe();
            this.postsService.getSimilar(this.postData.category.categoryId).subscribe({
              next: (posts) => {
                this.similarPosts = posts;
              }
            });
          }
        })
      }
    })
  }

  sanitizeHtml(html:string):SafeHtml{
    // add spacing between <p> tags
    const spacedHtml = html.replace(/<\/p><p>/g, '</p><br><p>');
    return this.sanitizer.bypassSecurityTrustHtml(spacedHtml);
  }
}
