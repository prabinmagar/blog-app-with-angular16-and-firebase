import { Timestamp } from "@angular/fire/firestore";

export interface NewsletterSubscriber {
  id?:string;
  email:string;
  createdAt:Timestamp;
}
