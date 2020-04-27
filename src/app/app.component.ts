import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "../../node_modules/bootstrap/dist/css/bootstrap.min.css","../../node_modules/font-awesome/css/font-awesome.min.css"]
})
export class AppComponent {
    
  categoryArray: any[];
  activeCategoryIndex = 0;
  islogin = true;
  constructor(private Auth: AuthService) {

    this.islogin = true;
  }
  isDropDown = false;
  dropdown(){
    
    var dropdownDom = document.getElementById('menu-dropdown');
    this.isDropDown = !this.isDropDown;
    if(this.isDropDown){
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

  title = 'CustomerService';
}
