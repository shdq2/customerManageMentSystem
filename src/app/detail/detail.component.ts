import { Component, OnInit, ɵConsole } from '@angular/core';
import {DeatilService} from './../deatil.service';
import {NgbModal,NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
import {Router, ActivatedRoute} from '@angular/router'
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class DetailComponent implements OnInit {
  isUpdateStatus=false;
  constructor(private modalService: NgbModal,private detail:DeatilService,private router:Router,private route:ActivatedRoute) { }
  user_Info:any;
  surgeryList:any;
  surgeryDeatilList:any;
  historyList:any;
  isSelected:boolean;
  currentItem:any;
  modal:any;
  currentPage = 1;
  pageNation=[];

  ngOnInit(): void {    
    
    this.getSurgeryList();       
    this.getUserData(); 
    this.isSelected = false;
    this.currentItem ={
      detail_pay:0
    }
  }

  addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  getSurgeryList(){
    this.detail.getSurgeryList().subscribe(data=>{
      this.surgeryList = data;
    })
  }
  
  getHistoryList(){
    this.pageNation = [];
    this.detail.getHistoryList(this.user_Info.customer_id).subscribe(data=>{
      var result = JSON.stringify(data);
      
      var resultJson = JSON.parse(result);      
      var pageItem = [];
      for(var i = (this.currentPage-1)*10 ; i <(this.currentPage*10-1)+1;i++){
        if(resultJson.length == i){
          break;
        }
        
        resultJson[i].isSelected = false;        
        pageItem.push(resultJson[i]);
      }            
      this.pageNation.push('');      
      this.pageNation.push('');      
      for(var i = 0 ; i  <resultJson.length/10;i++){          
          this.pageNation.push(i+1);          
      }      
      this.pageNation.push('');
      this.pageNation.push('');   
      console.log(this.pageNation); 
      this.historyList = pageItem;
      
    })
  }

  surgeryChange(value){
    console.log(value);
    this.isSelected = true;
    if(value == 0)
      this.isSelected = false;
    else{
      this.detail.getSurgeryDetailList(value).subscribe(data=>{
        this.surgeryDeatilList = data;
      })
    }
    
  }

  detailChange(idx){
    this.currentItem = this.surgeryDeatilList[idx];       
  }

  getUserData(){
    var params = JSON.stringify(this.route.params);    
    var paramsValue = JSON.parse(params)._value;    
    this.detail.getUserData(paramsValue.id).subscribe(data=>{
      var resultData = JSON.stringify(data);
    
      var resultJson = JSON.parse(resultData).result[0];       

      this.user_Info = resultJson;      
      this.getHistoryList();
    })    
  }

  open(content){
    this.modal = content;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {      
      
    }, (reason) => {
      
    });
  }
  onSubmit(customerData,content){    
    var sendData = {
      id:this.user_Info.customer_id,
      name:customerData.querySelector('input[name="name"]').value,
      addr:customerData.querySelector('input[name="addr"]').value,      
      phone:customerData.querySelector('input[name="phone"]').value,
      memo:customerData.querySelector('input[name="memo"]').value,
    }
    
    this.detail.updateUserData(sendData).subscribe(data=>{
      console.log(data);
    })
    content.close();
    this.getUserData();
    //this.Auth.pageReload('customer')    
  }

  addHistory(customerData,content){
    var sendData = {
      id:this.user_Info.customer_id,
      category:this.currentItem.detail_id,
      pay:customerData.querySelector('#money').value,
      type:customerData.querySelector('#surgery_pay_type').value,
      memo:customerData.querySelector('#memo').value,
    }
    console.log(sendData);
    console.log(this.currentItem)
    this.detail.addHistory(sendData).subscribe(data=>{
      content.close();
      this.ngOnInit();
    });    
  }
  deamClick(target,content){
    if(target.indexOf('deam') != -1)
      content.close()
  }
  
  pageChange(page){
    this.currentPage = page;
    this.getHistoryList();
  }

  prevnextBtn(idx){
    this.pageChange(this.currentPage+idx);    
  }
}
