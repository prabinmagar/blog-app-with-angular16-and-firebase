import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isSidebarVisible = false;

  constructor() { }

  showSidebar(){
    this.isSidebarVisible = true;
    console.log(this.isSidebarVisible);
  }

  hideSidebar(){
    this.isSidebarVisible = false;
  }
}
