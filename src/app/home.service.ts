import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getMonthSurgeryCount(first,last){
    return this.http.get('http://localhost:3000/home/getsurgerycount?first='+first+'&last='+last);
  }
  getSurgeryList(first,last){
    return this.http.get('http://localhost:3000/home/getsurgerylist?first='+first+'&last='+last);
  }
}
