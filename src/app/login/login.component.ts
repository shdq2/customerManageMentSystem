import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import {AppComponent} from '../app.component';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService,private cookieService:CookieService,private router:Router) {
    if(Auth.isLoginCheck()){
      
      router.navigate(['/main']);
    }
  }

  ngOnInit(): void {
  }
  
  islogin = this.Auth.islogin;
  
  private cookie:string;
  loginUser(event){
    
    var result = null;
    event.preventDefault();    
    const target = event.target;
    const userId = target.querySelector('#userId').value;
    const userPw = target.querySelector('#userPw').value;   
    var url = null;
    this.Auth.getUserDetails(userId,userPw).subscribe(data=>{  
      
      if((data as any).length == 1){     
        result = data[0];   
        this.Auth.islogin = true;
        this.cookieService.set('AdminLogin','true');
        
        this.router.navigate(['/main']);
      }else{
        this.Auth.islogin = false;
        console.log(data as any);
        alert('wrong Auth Data');        
        url = ""
        this.router.navigate(['/login']);
      } 
    },err=>{
      console.log(err);
    });
  }
}
