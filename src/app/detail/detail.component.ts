import { Component, OnInit, ɵConsole, Inject } from '@angular/core';
import {DeatilService} from './../deatil.service';
import {AuthService} from './../auth.service';
import {NgbModal,NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
import {Router, ActivatedRoute} from '@angular/router'
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData{
  name:string;
  date:string;
}

@Component({
  selector: 'app-customer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class DetailComponent implements OnInit {
  isUpdateStatus=false;
  constructor(private modalService: NgbModal,private detail:DeatilService,private router:Router,private route:ActivatedRoute,private Auth:AuthService,public dialog:MatDialog) { 
    Auth.isLoginCheck();
    if(!Auth.islogin){      
      router.navigate(['/login']);
    }
  }
  user_Info:any;
  surgeryList:any;
  surgeryDeatilList:any;
  historyList:any;
  isSelected:boolean;
  currentItem:any;
  modal:any;
  currentPage = 1;
  pageNation=[];
  date:any;
  
  currentHour:any;
  currentTime:any;
  ngOnInit(): void {    
    this.currentHour = new Date().getHours();
    this.currentTime = 0;
    if(this.currentHour > 12){
      this.currentHour -= 12;
      this.currentTime = 1;
    }
    console.log(this.currentHour);
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
      var result = JSON.stringify(data);      
      var resultJson = JSON.parse(result).result;    
      var resultData = [];
      for(var i = 0 ; i < resultJson.length;i++){
        
        if(resultJson[i].surgery_use == "1"){
          
          resultData.push(resultJson[i])
        }
      }
      this.surgeryList = resultData;
    })
  }
  
  getHistoryList(){
    this.pageNation = [];
    this.detail.getHistoryList(this.user_Info.customer_id).subscribe(data=>{
      var result = JSON.stringify(data);
      
      var resultJson = JSON.parse(result).result;      
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
      
      this.historyList = pageItem;
      
    })
  }

  surgeryChange(value){
    
    this.isSelected = true;
    if(value == 0)
      this.isSelected = false;
    else{
      this.detail.getSurgeryDetailList(value).subscribe(data=>{
        var result = JSON.stringify(data);      
        var resultJson = JSON.parse(result).result;  
        var resultData = [];
        for(var i = 0 ; i < resultJson.length;i++){          
          if(resultJson[i].detail_use == "1"){            
            resultData.push(resultJson[i])
          }
        }
        this.surgeryDeatilList = resultData;
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
    this.date = new FormControl(new Date());
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
    var d = new Date(this.date.value);
    var time = customerData.querySelector('input[name=time]:checked').value;
    var hour = customerData.querySelector('#hour').value;
    var min = customerData.querySelector('#min').value;
    if(time == 1){
      hour = parseInt(hour)+12;
    }
    var date = d.getFullYear() + "/"+(d.getMonth()+1) + "/"+d.getDay()+" " +hour+":"+min;
    
    var sendData = {
      id:this.user_Info.customer_id,
      category:this.currentItem.detail_id,
      pay:customerData.querySelector('#money').value,
      type:customerData.querySelector('#surgery_pay_type').value,
      memo:customerData.querySelector('#memo').value,
      time:date
    }    
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

  dateChange(date){
    this.date = date;    
  }
  removeHistory(history){
    const dialogRef = this.dialog.open(Dialog,
      {
        data:{name:this.user_Info.customer_name,date:history.his_date}
      });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.detail.removeHistory(history.hisId).subscribe(data=>{
          this.getHistoryList();      
        })    
      }      
    })
  }
}

@Component({
  selector:'dialog-message',
  templateUrl:'dialog.html',
  styleUrls: ['./detail.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class Dialog{
  test:any;
  constructor(public dialogRef:MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any){console.log(data);}
  onClick(val){
    this.dialogRef.close(val);
  }
  
}