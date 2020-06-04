import { Component, OnInit } from '@angular/core';
import {MenuService} from './../menu.service'
import {DeatilService} from './../deatil.service';
import {AuthService} from './../auth.service';
import {Router} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class MenuComponent implements OnInit {

  surgeryList:any;
  currentIdx = 0;  
  addData = {
    name:"",
    pay:"",
    title:0
  }
  deleteItemList:any;
  deleteSelectMenu = 0;
  deleteData:any;
  modal:any;
  constructor(private menu:MenuService,private detail:DeatilService,private route:Router,private Auth:AuthService,private modalService:NgbModal) {
    Auth.isLoginCheck();
    if(!Auth.islogin){      
      route.navigate(['/login']);
    }
    this.getSurgeryList();
  }

  getSurgeryList(){
    this.detail.getSurgeryList().subscribe(data=>{
      var result = JSON.stringify(data);      
      var resultJson = JSON.parse(result).result;    
      var resultData = [];
      for(var i = 0 ; i < resultJson.length;i++){
          resultData.push(resultJson[i])        
      }
      this.surgeryList = resultData;      
      this.addData.title = this.surgeryList[0].surgery_id;      
    })
  }

  getSurgeryDetailList(value){
    this.detail.getSurgeryDetailList(value).subscribe(data=>{
      var result = JSON.stringify(data);      
      var resultJson = JSON.parse(result).result;  
      var resultData = [];
      for(var i = 0 ; i < resultJson.length;i++){                  
          resultData.push(resultJson[i]);        
      }
      this.deleteItemList = resultData;      
    })
  }


  ngOnInit(): void {
  }

  onBtnCheck(idx){
    this.currentIdx = idx;
  }

  onAddTitle(value){
    this.menu.SearchSurgeryTitle(value.value).subscribe(data=>{
      var result = JSON.stringify(data);
      var resultJson = JSON.parse(result).result;
      if(resultJson.err){
        alert("Check log");
        console.log(resultJson.err);
      }else{
        if(resultJson.length == 0){
          this.menu.AddSurgeryTitle(value.value).subscribe(data2=>{
            var result2 = JSON.stringify(data2);
            var resultJson2 = JSON.parse(result2).result;
            if(resultJson2.err){
              alert("Check log");
              console.log(resultJson2.err);
            }else{              
              value.value="";
              this.getSurgeryList();
            }
          });
        }else{
          alert("이미 존재하는 타이틀 입니다.");
        }
      }
    });    
  }

  addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  onAddSurgery(event){
    event.preventDefault();
    this.menu.SearchSurgery(this.addData).subscribe(data=>{
      var result = JSON.stringify(data);
      var resultJson = JSON.parse(result).result;
      if(resultJson.err){
        alert("Check log");
        console.log(resultJson.err);
      }else{
        if(resultJson.length == 0){
          this.menu.addSurgery(this.addData).subscribe(data2=>{
            
            var result2 = JSON.stringify(data2);
            var resultJson2 = JSON.parse(result2).result;
            
            if(resultJson2.err){
              alert("Check log");
              console.log(resultJson2.err);
            }else{
              alert("정상적으로 추가 되었습니다");  
              this.addData.name = "";
              this.addData.pay="";            
              this.addData.title = 1;
            }
          });
        }else{
          alert("이미 존재하는 시술 입니다.");
        }
      }    
    });
  }

  onDeleteUseBtn(idx){    
    if(this.deleteSelectMenu == 0){
      this.surgeryList[idx].surgery_use = !this.surgeryList[idx].surgery_use;
      console.log("test");
      this.menu.UpdateSurgeryUse(this.surgeryList[idx]).subscribe(data=>{
        console.log(data);
      });    
    }else{      
      this.deleteItemList[idx].detail_use = !this.deleteItemList[idx].detail_use;
      this.menu.UpdateDetailUse(this.deleteItemList[idx]).subscribe(data=>{
        console.log(data);
      });  
    }
    
  }

  deleteSelect(idx){
    if(idx == 0){
      this.getSurgeryList();
    }else{
      this.getSurgeryDetailList(1);
    }
    this.deleteSelectMenu = idx;    
  }

  titleChange(id){
    this.getSurgeryDetailList(id);
  }


  updateSurgeryName(idx,name){
    var sendData =this.surgeryList[idx];
    sendData["name"] = name.value; 
    //
    if(name.value != ""){
      this.menu.UpdateSurgeryName(sendData).subscribe(data=>{
        var result = JSON.stringify(data);      
        var resultJson = JSON.parse(result).result;  
        if(resultJson.err){
          alert("Check Log");
          console.log(resultJson.err);
        }else{
          this.surgeryList[idx].surgery_name = name.value;
          name.value = "";
        }
      })
    }    
  }

  updateDetailData(name,pay,title,id){
    var sendData = {
      name:name.value,
      pay:pay.value,
      title:parseInt( title.value),
      id:id
    }
    this.menu.UpdateDetailData(sendData).subscribe(data=>{
      var result = JSON.stringify(data);      
      var resultJson = JSON.parse(result).result;  
      if(resultJson.err){
        alert("Check Log");
        console.log(resultJson.err);
      }else{
        this.getSurgeryDetailList(this.addData.title); 
      }      
    })
  }

  compulsionDelete(){
    var sendData = {
      table:"",
      colum:"",
      id:""
    }
    if(this.deleteSelectMenu == 0){
      sendData = {
        table:"surgery",
        colum:"surgery_id",
        id:this.deleteData.surgery_id
      }
    }else{
      sendData = {
        table:"surgery_detail",
        colum:"detail_id",
        id:this.deleteData.detail_id
      }
    }
    this.menu.DeleteCategory(sendData).subscribe(data=>{
      console.log(data);      
    })    
  }
  deamClick(target,content){
    if(target.indexOf('deam') != -1)
      content.close()
  }
  open(content,data){
    this.deleteData = data;
    this.modal = content;    
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {      
      if(result == "delete"){
        this.compulsionDelete();
        this.getSurgeryDetailList(this.addData.title);
        this.getSurgeryList();
      }      
      this.deleteData = {};      
    }, (reason) => {      
    });
  }
}
