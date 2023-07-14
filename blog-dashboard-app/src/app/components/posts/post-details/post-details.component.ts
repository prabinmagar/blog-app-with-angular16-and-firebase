import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  docId!:string;
  detailsPostData:any = {};
  detailsCommentsData:any[] = [];
  sanitizedContent!:SafeHtml

  constructor(
    private postsService:PostsService,
    private route:ActivatedRoute,
    private sanitizer:DomSanitizer
  ){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.docId = value['id'];
      if(this.docId){
        this.postsService.getPost(this.docId).subscribe({
          next: (post) => {
            this.detailsPostData = post;
            console.log(post);
            this.sanitizedContent =this.sanitizeHtml(post.content);
          }
        });

        this.postsService.getComments(this.docId).subscribe({
          next: (comments) => {
            this.detailsCommentsData = comments;
            console.log(comments);
          }
        })
      }
    });
  }

  sanitizeHtml(html:string):SafeHtml{
    const spacedHtml = html.replace(/<\/p><p>/g, '</p><br><p>');
    return this.sanitizer.bypassSecurityTrustHtml(spacedHtml);
  }
}
