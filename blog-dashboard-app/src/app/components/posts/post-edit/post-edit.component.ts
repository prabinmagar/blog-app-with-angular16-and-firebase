import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { generatePermalink } from 'src/app/utils/permalink-utils';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit{
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

  editPostForm!:FormGroup;
  categoriesList:Category[] = [];
  selectedImg!:File;

  editPostData:any = {};
  docId!:string;

  constructor(
    private postsService:PostsService,
    private formBuilder:FormBuilder,
    private categoriesService:CategoriesService,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private router:Router
  ){

    this.editPostForm = this.formBuilder.group({
      title: [this.editPostData.title, Validators.required],
      excerpt:['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      tags:['', null],
      featuredImage: ['', null],
      isFeatured: ['', null],
      status: ['', null]
    })
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => this.categoriesList = categories
    });

    this.populateForm();
  }

  populateForm():void{
    this.route.queryParams.subscribe(value => {
      this.docId = value['id'];
      this.postsService.getPost(this.docId).subscribe({
        next: (post) => {
          this.editPostData = post;
          this.editPostForm = this.formBuilder.group({
            title: [this.editPostData.title, Validators.required],
            excerpt:[this.editPostData.excerpt, Validators.required],
            content: [this.editPostData.content, Validators.required],
            category: [this.editPostData.category, Validators.required],
            author: [this.editPostData.author, Validators.required],
            tags:[this.editPostData.tags.join(','), null],
            featuredImage: ["", null],
            isFeatured: [this.editPostData.isFeatured, null],
            status: [this.editPostData.status, null]
          })
          this.editPostForm.patchValue({ category: this.editPostData.category });
        }
      })
    });
  }

  onFileSelected(event:any):void{
    this.selectedImg = event.target.files[0];
  }

  onSubmit(){
    if(this.editPostForm.valid){
      const formData = this.editPostForm.value;
      const selectedCategory: {
        categoryId: string,
        categoryName: string
      } = formData.category;

      const permalink = generatePermalink(formData.title);
      const tags:string[] = formData.tags.trim().length > 0 ? formData.tags.split(",").map((tag:string) => tag.trim()) : [];

      const post:any = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: {
          categoryId: selectedCategory.categoryId,
          categoryName: selectedCategory.categoryName,
        },
        author: formData.author,
        tags: tags,
        isFeatured: formData.isFeatured,
        status: formData.status,
        permalink: permalink,
        updatedAt: Timestamp.now()
      };

      if(typeof this.selectedImg !== 'undefined' && this.selectedImg !== null){
        this.postsService.uploadImage(this.selectedImg).subscribe({
          next: (downloadURL) => {
            post.featuredImage = downloadURL;
            this.toastr.success("Imaged uploaded");
            this.postsService.updatePost(this.docId, post).subscribe({
              next: () => {
                this.editPostForm.reset();
                this.router.navigate(['/posts']);
              }
            });
          }
        })
      } else {
        this.postsService.updatePost(this.docId, post).subscribe({
          next: () => {
            this.router.navigate(['/posts']);
          }
        });
      }
    } else{
      this.toastr.error("Please fill the form with correct data");
    }
  }

  get fc(){
    return this.editPostForm.controls;
  }
}
