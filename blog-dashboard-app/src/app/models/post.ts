import { Timestamp } from "@angular/fire/firestore";
import { Category } from "./category";

export interface Post {
  id?:string;
  title:string;
  excerpt:string;
  content:string;
  category: {
    categoryId:string;
    categoryName:string;
  };
  author:string,
  tags?:string[];
  featuredImage:string;
  isFeatured:boolean;
  status:boolean,
  permalink:string;
  views:number,
  createdAt: Timestamp
  updatedAt: Timestamp
}
