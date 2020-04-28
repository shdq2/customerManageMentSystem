import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {NgbModal,NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "../../node_modules/bootstrap/dist/css/bootstrap.min.css","../../node_modules/font-awesome/css/font-awesome.min.css"]
})
export class AppComponent {
    
  categoryArray: any[];
  activeCategoryIndex = 0;
  islogin = true;
  constructor(public Auth: AuthService,private modalService:NgbModal,private cookieService:CookieService,private route:Router) {
    Auth.isLoginCheck();
    this.islogin = Auth.islogin;    
  }
  isDropDown = false;

  changePwTxt = "";
  changePwTxt2 = "";
  currentPw = "";

  dropdown(idx){   
    
    var dropdownDom;
    if(idx == 0) {
      dropdownDom = document.getElementById('menu-dropdown');
    }else{    
      dropdownDom = document.getElementById('menu-dropdown2');      
    }
        
    //this.isDropDown = !this.isDropDown;
    
    if(dropdownDom.classList.value.indexOf('active') == -1){
      dropdownDom.classList.add('active');
    }else{
      dropdownDom.classList.remove('active');
    }
  }
  menuControl(idx,event){            
    this.activeCategoryIndex = idx;
    var menuList = document.getElementsByClassName('main-menu');
    for(var i = 0 ; i < menuList.length;i++){      
      menuList[i].classList.remove('active');
    }    
    menuList[idx].classList.add('active');
  }
  deamClick(target,content){
    if(target.indexOf('deam') != -1)
      content.close()
  }

  open(content){
    var dropdownDom = document.getElementById('menu-dropdown');      
    var dropdownDom2 = document.getElementById('menu-dropdown2');      
    dropdownDom.classList.remove('active');
    dropdownDom2.classList.remove('active');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {      
      
    }, (reason) => {
      
    });
  }

  onSubmit(content){    
    console.log(this.currentPw,'/',this.changePwTxt2);
    this.Auth.pwCheck(this.currentPw).subscribe(data=>{
      var result = JSON.stringify(data);
      var resultJson = JSON.parse(result);
      if(resultJson.length ==0){
        alert("현재 비밀번호가 옳지 않습니다");
      }else{
        if(this.changePwTxt != "" && this.changePwTxt2 != ""){
          if(this.changePwTxt == this.changePwTxt2){
            this.Auth.pwchange(this.changePwTxt).subscribe(data2=>{
              var result2 = JSON.stringify(data2);
              var resultJson2 = JSON.parse(result);
              if(resultJson2.err){
                console.log(resultJson2.err);
                alert("error 발생 로그 참조");
              }else{
                alert("비밀번호 변경 완료");
                console.log("success");
              }
            })
          }else{
            alert("비밀번호와 비밀번호 확인이 다릅니다.");
          }
        }else{
          alert("비밀번호는 공백이 될 수 없습니다.");
        }
      }
    })
    // var sendData = {
    //   id:this.user_Info.customer_id,
    //   name:customerData.querySelector('input[name="name"]').value,
    //   addr:customerData.querySelector('input[name="addr"]').value,      
    //   phone:customerData.querySelector('input[name="phone"]').value,
    //   memo:customerData.querySelector('input[name="memo"]').value,
    // }
    
    // this.detail.updateUserData(sendData).subscribe(data=>{
    //   console.log(data);
    // })
    content.close();
    
    //this.Auth.pageReload('customer')    
  }
  logout(){
    
    this.cookieService.deleteAll();
    this.route.navigate(['/login']);
  }
  title = 'CustomerService';
}
