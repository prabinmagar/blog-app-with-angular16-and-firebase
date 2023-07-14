import { Component, OnInit } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscriber-view',
  templateUrl: './subscriber-view.component.html',
  styleUrls: ['./subscriber-view.component.scss']
})
export class SubscriberViewComponent implements OnInit {
  subscribersList:any[] = [];

  constructor(
    private subscribersService:SubscribersService
  ){}
  ngOnInit(): void {
    this.subscribersService.getSubscribers().subscribe({
      next: (subscribers) => this.subscribersList = subscribers
    })
  }
}
