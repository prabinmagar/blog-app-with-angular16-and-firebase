import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PostViewComponent } from './components/posts/post-view/post-view.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { CategoryViewComponent } from './components/categories/category-view/category-view.component';
import { SubscriberViewComponent } from './components/subscribers/subscriber-view/subscriber-view.component';
import { authGuard } from './guards/auth.guard';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [authGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent },
  { path: "posts", component: PostViewComponent, canActivate: [authGuard] },
  { path: "posts/create", component: PostCreateComponent, canActivate: [authGuard] },
  { path: "posts/edit", component: PostEditComponent, canActivate: [authGuard] },
  { path: "posts/details", component: PostDetailsComponent, canActivate: [authGuard]},
  { path: "categories", component: CategoryViewComponent, canActivate: [authGuard] },
  { path: "categories/create", component: CategoryCreateComponent, canActivate: [authGuard]},
  { path: "categories/edit", component: CategoryEditComponent},
  { path: "subscriptions", component: SubscriberViewComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
