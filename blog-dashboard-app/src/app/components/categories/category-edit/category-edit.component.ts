import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit{
  editCategoryData:any = {};
  docId!:string;

  constructor(
    private categoryService:CategoriesService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.docId = value['id'];
      this.categoryService.getCategory(this.docId).subscribe({
        next: (category) => {
          this.editCategoryData = category;
        }
      });
    });
  }

  onSubmit(form:NgForm){
    console.log("triggered");
    const categoryData = {
      category: form.value.category,
      description: form.value.description
    }

    this.categoryService.updateCategory(this.editCategoryData?.id, categoryData).subscribe({
      next: () => {
        this.router.navigate(["/categories"]);
      }
    });
  }
}
