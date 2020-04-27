import { Component, OnInit } from '@angular/core';
import {HomeService} from './../home.service';
import {NgbModal,NgbModalModule} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class MainComponent{
  currentTitle:any;
  calendarBody:any;
  dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
  notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
  
  constructor(private home:HomeService,private modalService:NgbModal) { }
  today = new Date();
  first = new Date(this.today.getFullYear(), this.today.getMonth(),1);
  surgeryCount = {};
  pageFirst = this.first;
  pageYear:any;
  monthDay = [];
  currentMonth;
  prevTarget:any;
  monthCount = {};
  surgeryList={};
  dayTotalPay = '0';
  targetSurgery:any;
  monthTotal = {
    visit:0,
    totalPay:'0'
  };
  
  addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  ngOnInit(): void {
    if(this.first.getFullYear() % 4 === 0){
      this.pageYear = this.leapYear;
    }else{
        this.pageYear = this.notLeapYear;
    }
    
    this.calendarBody = document.getElementById('calendar-body');
    this.currentTitle = document.getElementById('current-year-month');
    this.getMonthSurgery();
    
  }

  getMonthSurgery(){
    this.monthCount = {};
    var month = (this.first.getMonth()+1)+'';
    if(parseInt(month) <10){
      month = '0'+month;
    }
    var thisMonthFirstDay = this.first.getFullYear()+'-'+month+'-01';
    var thisMonthLastDay = this.first.getFullYear()+'-'+month+'-'+this.pageYear[this.first.getMonth()];
    
    this.home.getMonthSurgeryCount(thisMonthFirstDay,thisMonthLastDay).subscribe(data=>{
      var result = JSON.stringify(data);
      var resultJson = JSON.parse(result).result;
      for(var i = 0 ; i < resultJson.length;i++){
        this.monthCount[parseInt(resultJson[i].thisDay)+''] = resultJson[i].count;        
      }
      
      this.getSurgeryList();
      this.showCalendar(this.first);
    })        
  }

  getSurgeryList(){
    var month = (this.first.getMonth()+1)+'';
    if(parseInt(month) <10){
      month = '0'+month;
    }
    this.monthTotal = {
      visit:0,
      totalPay:'0'
    };
    var thisMonthFirstDay = this.first.getFullYear()+'-'+month+'-01';
    var thisMonthLastDay = this.first.getFullYear()+'-'+month+'-'+this.pageYear[this.first.getMonth()];
    this.surgeryList = {};
    this.home.getSurgeryList(thisMonthFirstDay,thisMonthLastDay).subscribe(data=>{
      
      var result = JSON.stringify(data);
      
      var resultJson = JSON.parse(result).result;
      
      for(var i = 0;  i <resultJson.length;i++){
        
        var res = [];
        if(this.surgeryList[resultJson[i]._day] != null){
          res = this.surgeryList[resultJson[i]._day];
        }
        res.push(resultJson[i]);
        this.surgeryList[resultJson[i]._day] = res;
        this.monthTotal.totalPay =(parseInt(this.monthTotal.totalPay)+ parseInt(resultJson[i].pay)) + '';
      }      
      this.monthTotal["visit"] = resultJson.length;
      this.monthTotal.totalPay = this.addComma(this.monthTotal.totalPay);            
    });    
  }
  showCalendar(thisMonth){
    this.currentMonth = this.monthList[this.first.getMonth()];
    let monthCnt = 100;
    let cnt = 1;
    
    this.monthDay = [];
    for(var i = 0; i < 6; i++){      
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt+'');   
        var week = [];
        for(var j = 0; j < 7; j++){
          var day = []
          var date = {
            day:'',
            activate:false,
            count:0
          };
          if((i === 0 && j < thisMonth.getDay()) || cnt > this.pageYear[thisMonth.getMonth()]){    
              
          }else{           
              date.day = cnt+'';
              
              if(this.monthCount[cnt] != undefined){
                date.count = this.monthCount[cnt];
              }
              if(cnt == this.today.getDate()){                  
                this.prevTarget = date;
              }
              cnt++;
          }
          week.push(date);
        }
        this.monthDay.push(week);
        monthCnt++;
        
        //this.calendarBody.appendChild($tr);
    }    
    var firstDayOfMonth = new Date( this.first.getFullYear(), this.first.getMonth()-4 , 1 );        
  }
  
  prevBtn(){
    var firstDayOfMonth = new Date( this.first.getFullYear(), this.first.getMonth()-1 , 1 );
    this.first = firstDayOfMonth;    
    this.getMonthSurgery();
  }

  nextBtn(){
    var firstDayOfMonth = new Date( this.first.getFullYear(), this.first.getMonth()+1 , 1 );
    this.first = firstDayOfMonth;    
    this.getMonthSurgery();
  }

  removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr+'');
        $tr.remove();
        catchTr++;
    }
  }
  dayClick(target,content,day){    
    if(this.prevTarget.day != target.day){
      if(this.prevTarget != null){
        this.prevTarget.activate = false;        
      }
      
      this.prevTarget = target;
    }    
    //target.activate = !target.activate;    
    if(target.count > 0){
      this.targetSurgery= this.surgeryList[day];
      for(var i = 0 ; i < this.targetSurgery.length;i++){
        this.dayTotalPay = (parseInt(this.dayTotalPay) + parseInt(this.targetSurgery[i].pay)) + "";
        console.log(this.dayTotalPay + this.targetSurgery[i].pay);
      }
      this.dayTotalPay = this.addComma(this.dayTotalPay);
      this.open(content);
    }    
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {      
      
    }, (reason) => {
      
    });
  }

  deamClick(target,content){
    if(target.indexOf('deam') != -1)
      content.close()
  }
}
