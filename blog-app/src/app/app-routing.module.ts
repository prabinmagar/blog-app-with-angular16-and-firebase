import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategorySingleComponent } from './pages/category-single/category-single.component';
import { PostSingleComponent } from './pages/post-single/post-single.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostSearchComponent } from './pages/post-search/post-search.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "categories/:categoryId", component: CategorySingleComponent },
  { path: "posts", component: PostsComponent },
  { path: "posts/:postId", component: PostSingleComponent},
  { path: "posts/search/:keyword", component: PostSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
