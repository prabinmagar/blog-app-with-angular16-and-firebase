import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewsletterSubscriber } from 'src/app/models/NewsletterSubscriber';
import { CommentsService } from 'src/app/services/comments.service';
import { NewsletterSubscribersService } from 'src/app/services/newsletter-subscribers.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit{
  addCommentForm!:FormGroup;
  @Input() postId!:string;

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private commentsService:CommentsService,
    private newsletterSubscribersService:NewsletterSubscribersService
  ){
    this.addCommentForm = this.formBuilder.group({
       name: ['', Validators.required],
       message: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       subscribeNewsletter: ['', null]
    });

    console.log(this.postId);
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.addCommentForm.valid){
      const comment:any = {
        name: this.addCommentForm.value.name,
        message: this.addCommentForm.value.message,
        email: this.addCommentForm.value.email,
        subscribeNewsletter: this.addCommentForm.value.subscribeNewsletter,
        createdAt: Timestamp.now()
      };

      this.commentsService.addComment(comment, this.postId).subscribe({
        next: () => {
          if(comment.subscribeNewsletter){
            this.newsletterSubscribersService.checkSubscription(comment.email).subscribe({
              next: (existingUser) => {
                if(existingUser.length == 0){
                  const subsData = {
                    email: comment.email,
                    createdAt: comment.createdAt
                  }
                  this.newsletterSubscribersService.addSubscription(subsData).subscribe();
                }
              }
            })
          }
          this.commentsService.reloadComments();
        }
      });
    } else {
      this.toastr.error("Please fill properly");
    }
  }
}
