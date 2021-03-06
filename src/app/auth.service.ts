import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient,private cookieService:CookieService,private router:Router) { }
  islogin = true;
  getUserDetails(userId,userPw) { 
    
    return this.http.post('http://localhost:3000/auth/login',{
      userId,userPw
    })         
  } 

  pwCheck(pw){
    
    return this.http.post('http://localhost:3000/auth/pwcheck',{
      pw
    })      
  }
  pwchange(pw){    
    return this.http.post('http://localhost:3000/auth/pwchange',{
      pw
    })      
  }
  
  isLoginCheck(){            
    this.islogin = this.cookieService.get('AdminLogin') == 'true';    
  }

  changeUrl(url){    
    var a = this.http.get('http://localhost:3000/pageChange/'+url);
    return a;
  }

  idCheck(id){      
    var a = this.http.get('http://localhost:3000/auth/idCheck/'+id);    
    return a;
  }

  getUserList(data){           
    return this.http.get('http://localhost:3000/auth/callList?type='+data.type+'&id='+data.id+'&page=2');
  }

  addUserData(data){
    return this.http.post('http://localhost:3000/auth/addcustomer',data);     
  }
  deleteUserData(data){
    
    return this.http.post('http://localhost:3000/auth/deletecustomer',{id:data});     
  }

  pageReload(page){    
    this.router.navigate(['/'+page]);
  }
}
