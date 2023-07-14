import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  constructor(
    private categoryService:CategoriesService
  ){}

  ngOnInit(): void {

  }

  onSubmit(form:NgForm){
    const categoryData:Category = {
      category: form.value.category,
      description: form.value.description,
      createdAt: Timestamp.now()
    }
    this.categoryService.addCategory(categoryData).subscribe({
      next: () => {
        form.resetForm();
      }
    });
  }

  onReset(){
  }
}
