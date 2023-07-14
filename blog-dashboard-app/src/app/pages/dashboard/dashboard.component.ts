import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
    if(this.authService.authState){
      this.router.navigate(['/']);
    }
  }
}
