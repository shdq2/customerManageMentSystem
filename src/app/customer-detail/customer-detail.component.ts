import { Component, OnInit, ɵConsole } from '@angular/core';
import {DeatilService} from './../deatil.service';
import {Router, ActivatedRoute} from '@angular/router'
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class CustomerDetailComponent implements OnInit {
  isUpdateState=true;
  constructor(private detail:DeatilService,private router:Router,private route:ActivatedRoute) { }
  user_Info:any;
  ngOnInit(): void {    
    this.getUserData();    
  }

  
  getUserData(){
    var params = JSON.stringify(this.route.params);    
    var paramsValue = JSON.parse(params)._value;    
    this.detail.getUserData(paramsValue.id).subscribe(data=>{
      var resultData = JSON.stringify(data);
    
      var resultJson = JSON.parse(resultData).result[0]; 
      console.log(resultJson);
      this.user_Info = resultJson;
    })    
  }

  onUpdateBtn(){
    this.isUpdateState=true;
  }
}
