import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  postsList:any = [];
  featuredPosts:any = [];
  categoriesList:any = [];

  slideConfig: any = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  slickInit(e:any) {
    console.log('slick initialized');
  }

  constructor(
    private postsService:PostsService,
    private categoriesService:CategoriesService
  ){
    this.postsService.getLatestPost().subscribe({ next: (posts) => this.postsList = posts});
    this.postsService.getFeaturedPosts().subscribe({ next: (posts) => this.featuredPosts = posts });
    this.categoriesService.getCategories().subscribe({ next: (categories) => this.categoriesList = categories });
  }

  ngOnInit(): void {

  }
}
