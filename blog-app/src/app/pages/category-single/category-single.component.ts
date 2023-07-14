import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-category-single',
  templateUrl: './category-single.component.html',
  styleUrls: ['./category-single.component.scss']
})
export class CategorySingleComponent implements OnInit {
  categoryId!:any;
  categoryData!:any;
  categoryPosts:any[] = [];

  constructor(
    private route:ActivatedRoute,
    private categoriesSerivce:CategoriesService,
    private postsService:PostsService
  ){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');

      if(this.categoryId){
        this.categoriesSerivce.getCategory(this.categoryId).subscribe({
          next: (category) => {
            this.categoryData = category;
            this.postsService.getCategoryPosts(this.categoryId).subscribe({
              next: (posts) => {
                this.categoryPosts = posts;
              }
            })
          }
        })
      }
    })
  }
}
