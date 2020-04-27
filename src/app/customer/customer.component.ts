import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgbModal,NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class CustomerComponent implements OnInit {
  items:any[] = [];
  currentIdx = 0;
  isMasterCheck = false;
  customerForm;
  defaultData={
    type:'all',
    id:''
  };
  constructor(private modalService: NgbModal,
    private Auth:AuthService,
    private router:Router
    ) { 
    
  }
  closeResult = '';
  isCheck = false;
  modal = null;
  searchType="all";
  searchData="";
  ngOnInit(): void {
    this.getUserList(this.defaultData);
  }

  getUserList(userData){
    this.Auth.getUserList(userData).subscribe(data=>{   
      
      var result = JSON.stringify(data);
      var resultJson = JSON.parse(result).result;
      for(var i = 0 ; i <resultJson.length;i++){
        resultJson[i].isSelected = false;        
      }      
      this.items = resultJson;    
    }) 
    this.isCheck = this.isMasterCheck;   
  }
  onChange(value){
    this.searchType = value;
  }


  checkboxAllClick(target){
    this.isMasterCheck = !this.isMasterCheck;
    for(var i = 0 ; i <this.items.length;i++){
      this.items[i].isSelected = this.isMasterCheck;
    }
    this.isAllCheck();
  }

  isAllCheck(){
    
    var allCheck = this.items[0].isSelected;
    for(var i = 0 ; i <this.items.length;i++){
      if(allCheck != this.items[i].isSelected){        
        this.isMasterCheck = false;        
        return;
      }
    }

    this.isMasterCheck = allCheck;
     
  }
  onDetail(id){
    this.router.navigate(['/detail',id]);
  }
  
  open(content) {
    this.modal = content;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {      
      
    }, (reason) => {
      
    });
    
    
    
  }
  onSubmit(customerData,content){    
    var sendData = {
      id:customerData.querySelector('input[name="id"]').value,
      name:customerData.querySelector('input[name="name"]').value,
      addr:customerData.querySelector('input[name="addr"]').value,
      phone:customerData.querySelector('input[name="phone"]').value
    }
    
    if(this.currentIdx == -1){
      this.Auth.addUserData(sendData).subscribe(data=>{
        
      });
    }    
    content.close();
    this.getUserList(0);
    //this.Auth.pageReload('customer')    
  }

  onDeleteItem(modal){
    var isSelectedItem = [];
    for(var i = 0 ; i <this.items.length;i++){
      if(this.items[i].isSelected){
        isSelectedItem.push(this.items[i].customer_id);
        this.Auth.deleteUserData(this.items[i].customer_id).subscribe(data=>{
          console.log(data);
        });
      }
    }
   this.getUserList(0); 
   modal.close();
   this.isMasterCheck = false
  }

  onSearchUser(){
    this.defaultData.type=this.searchType;
    this.defaultData.id = this.searchData;    
    this.getUserList(this.defaultData);
  }
  deamClick(target,content){
    if(target.indexOf('deam') != -1)
      content.close()
  }
}
