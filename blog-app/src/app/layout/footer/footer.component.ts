import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewsletterSubscriber } from 'src/app/models/NewsletterSubscriber';
import { Timestamp } from '@angular/fire/firestore';
import { NewsletterSubscribersService } from 'src/app/services/newsletter-subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private newsletterSubscribersService:NewsletterSubscribersService,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {

  }

  onSubmit(subscribeForm:NgForm){
    if(subscribeForm.valid){
      const subscriber:NewsletterSubscriber = {
        email: subscribeForm.value.email,
        createdAt: Timestamp.now()
      };


      this.newsletterSubscribersService.checkSubscription(subscriber.email).subscribe({
        next: (existingUser) => {
          console.log(existingUser);
          if(existingUser.length !== 0){
            this.toastr.warning("You are already in subscription.");
          } else {
            this.newsletterSubscribersService.addSubscription(subscriber).subscribe();
          }
        },
        error: () => this.toastr.error("An error occurred. Please try again!")
      })
    }
  }
}
