import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit{
  @Input() modalData:any;
  @Output() modalClosed:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private categoriesService:CategoriesService
  ){

  }

  ngOnInit(): void {
  }

  onModalConfirmed(){
    this.categoriesService.deleteCategory(this.modalData.id).subscribe({
      next: () => {
        this.modalClosed.emit(true);
      }
    })

  }
  onModalCanceled(){
    this.modalClosed.emit(false);
  }
}
