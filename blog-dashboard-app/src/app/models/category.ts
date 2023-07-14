import { Timestamp } from "@angular/fire/firestore";

export interface Category {
  id?:string;
  category:string;
  description:string,
  createdAt:Timestamp
}
