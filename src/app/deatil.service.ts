import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeatilService {

  constructor(private http:HttpClient) { }

  getUserData(id){
    return this.http.get('http://localhost:3000/detail/get?id='+id);
  }

  updateUserData(data){        
    return this.http.post('http://localhost:3000/detail/updatecustomer',data);     
  }

  getSurgeryList(){
    return this.http.get('http://localhost:3000/detail/surgerylist');     
  }
  getSurgeryDetailList(id){
    return this.http.get('http://localhost:3000/detail/detailsurgerylist?id='+id);     
  }

  getHistoryList(id){
    return this.http.get('http://localhost:3000/detail/getHistoryList?id='+id);     
  }

  addHistory(data){
    return this.http.post('http://localhost:3000/detail/addHistory',data);     
  }
}
