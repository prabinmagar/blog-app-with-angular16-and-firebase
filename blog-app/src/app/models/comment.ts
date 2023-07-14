import { Timestamp } from "@angular/fire/firestore";

export interface Comment {
  id?:string;
  name:string;
  message:string;
  email:string;
  subscribeNewsletter:boolean;
  createdAt:Timestamp;
}
