import { Component, OnInit } from '@angular/core';
import {HomeService} from './../home.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentTitle:any;
  calendarBody:any;
  dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
  notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
  
  constructor(private home:HomeService) { }
  today = new Date();
  first = new Date(this.today.getFullYear(), this.today.getMonth(),1);
  surgeryCount = {};
  pageFirst = this.first;
  pageYear:any;
  monthDay = [];
  currentMonth;
  prevTarget:any;
  monthCount = {};
  
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
    var thisMonthFirstDay = this.first.getFullYear()+'-'+month+'-'+1;
    var thisMonthLastDay = this.first.getFullYear()+'-'+month+'-'+this.pageYear[this.first.getMonth()];
    console.log();
    this.home.getMonthSurgeryCount(thisMonthFirstDay,thisMonthLastDay).subscribe(data=>{
      var result = JSON.stringify(data);
      var resultJson = JSON.parse(result).result;
      for(var i = 0 ; i < resultJson.length;i++){
        this.monthCount[resultJson[i].thisDay+''] = resultJson[i].count;        
      }
      
      this.showCalendar(this.first);
    })    
    
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
  dayClick(target){    
    if(this.prevTarget.day != target.day){
      if(this.prevTarget != null){
        this.prevTarget.activate = false;        
      }
      
      this.prevTarget = target;
    }
    
    target.activate = !target.activate;    
  }
}
