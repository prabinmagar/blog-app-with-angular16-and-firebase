import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit(): void {
    if(this.authService.authState){
      this.router.navigate(['/']);
    }
  }

  onSubmit(formValues:any){
    this.authService.login(formValues.email, formValues.password);
  }
}
