import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostSingleComponent } from './pages/post-single/post-single.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { CategorySingleComponent } from './pages/category-single/category-single.component';

import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// firebase config
import { environment } from 'src/environments/environment.development';
// firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// firebase authentication
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToastrModule } from 'ngx-toastr';
import { CategoryCardComponent } from './components/category-card/category-card.component';

import { SlickCarouselModule} from 'ngx-slick-carousel';
import { PostSearchComponent } from './pages/post-search/post-search.component';
import { CommentsFormComponent } from './components/comments-form/comments-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PostsComponent,
    PostSingleComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostCardComponent,
    CommentsListComponent,
    CategorySingleComponent,
    CategoryCardComponent,
    PostSearchComponent,
    CommentsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
