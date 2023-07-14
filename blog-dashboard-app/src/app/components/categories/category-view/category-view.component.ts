import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

interface ModalData {
  showModal: boolean;
  id: string;
}

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  categoriesList:Category[] = [];
  modalData:ModalData = {
    showModal: false,
    id: ""
  }

  constructor(
    private categoriesService:CategoriesService
  ){}

  ngOnInit(): void {
    this.onLoad();
  }

  onDeleteButtonClick(id:any){
    this.modalData.showModal = true;
    this.modalData.id = id;
  }

  onModalClosed(result:boolean){
   this.modalData.showModal = false;
   if(result){
    this.onLoad();
   }
  }

  onLoad(){
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categoriesList = categories;
      }
    });
  }
}
