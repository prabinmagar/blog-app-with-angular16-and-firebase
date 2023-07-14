import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState:boolean = false;
  authenticatedUser:any = null;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private afAuth:AngularFireAuth
  ) {
    this.checkAuthState();
  }

  login(email:string, password:string){
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        this.authState = true;
        this.toastr.success("Login in successfull.");
        this.router.navigate(['/']);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.error(`Login failed: ${errorCode} ${errorMessage}`);
      });
  }

  logout(){
    this.afAuth.signOut()
      .then(() => {
        this.authState = false;
        this.toastr.success("Logged out successfully");
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
  }

  checkAuthState(){
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user){
      this.authState = true;
      this.authenticatedUser = user;
    }
    else {
      this.afAuth.authState.subscribe((user) => {
        this.authenticatedUser = user;
        this.authState = true;
      });
    }
  }

  get currentUser():any{
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

}
