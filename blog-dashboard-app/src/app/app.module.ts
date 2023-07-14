import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PostViewComponent } from './components/posts/post-view/post-view.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';
import { PostDeleteComponent } from './components/posts/post-delete/post-delete.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { CategoryCreateComponent } from './components/categories/category-create/category-create.component';
import { CategoryViewComponent } from './components/categories/category-view/category-view.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/categories/category-delete/category-delete.component';
import { SubscriberViewComponent } from './components/subscribers/subscriber-view/subscriber-view.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { HttpClientModule} from '@angular/common/http';
// angular editor
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
// angular toastr
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
// firebase config
import { environment } from 'src/environments/environment.development';
// firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// firebase authentication
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysLengthPipe } from './pipes/keys-length.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostViewComponent,
    PostCreateComponent,
    PostEditComponent,
    PostDeleteComponent,
    PostDetailsComponent,
    CategoryCreateComponent,
    CategoryViewComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
    SubscriberViewComponent,
    LoginComponent,
    KeysLengthPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

