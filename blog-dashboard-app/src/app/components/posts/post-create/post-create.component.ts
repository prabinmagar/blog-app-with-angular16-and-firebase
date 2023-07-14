import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { generatePermalink } from 'src/app/utils/permalink-utils';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '60',
    minHeight: '60',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
  };

  addPostForm!:FormGroup;
  categoriesList:Category[] = [];
  selectedImg!:File;

  constructor(
    private postsService:PostsService,
    private formBuilder:FormBuilder,
    private categoriesService:CategoriesService,
    private toastr:ToastrService
  ){
    this.addPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      excerpt:['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      tags:['', null],
      featuredImage: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categoriesList = categories;
      }
    });
  }

  onFileSelected(event:any):void{
    this.selectedImg = event.target.files[0];
  }

  onSubmit(){
    if(this.addPostForm.valid){
      const formData = this.addPostForm.value;
      const selectedCategory: {
        categoryId: string,
        categoryName: string
      } = formData.category;

      const permalink = generatePermalink(formData.title);
      const tags:string[] = formData.tags.trim().length > 0 ? formData.tags.split(",").map((tag:string) => tag.trim()) : [];

      const post:Post = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: {
          categoryId: selectedCategory.categoryId,
          categoryName: selectedCategory.categoryName,
        },
        author: formData.author,
        tags: tags,
        featuredImage: "",
        isFeatured: false,
        status: false,
        permalink: permalink,
        views: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      if(this.selectedImg){
        this.postsService.uploadImage(this.selectedImg).subscribe({
          next: (downloadURL) => {
            post.featuredImage = downloadURL;
            this.toastr.success("Imaged uploaded");
            this.postsService.addPost(post).subscribe({
              next: () => this.addPostForm.reset()
            });
          }
        })
      }
    } else{
      this.toastr.error("Please fill the form with correct data");
    }
  }

  get fc(){
    return this.addPostForm.controls;
  }
}

