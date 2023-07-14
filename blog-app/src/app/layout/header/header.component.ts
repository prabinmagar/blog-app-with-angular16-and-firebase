import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private sidebarService:SidebarService,
    private postsService:PostsService,
    private router:Router
  ){}

  ngOnInit(): void {

  }

  onShow():void{
    this.sidebarService.isSidebarVisible = true;
  }

  onSubmit(searchForm:NgForm){
    let keyword = searchForm.value.keyword;
    if(keyword){
      this.router.navigate(['/posts/search', keyword]);
    }
  }
}
