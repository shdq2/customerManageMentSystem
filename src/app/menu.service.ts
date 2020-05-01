import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  SearchSurgeryTitle(title){
    return this.http.get('http://localhost:3000/surgery/searchtitle?title='+title);
  }
  AddSurgeryTitle(title){
    return this.http.post('http://localhost:3000/surgery/addtitle',{title:title});
  }

  addSurgery(data){
    return this.http.post('http://localhost:3000/surgery/addsurgery',data);
  }

  SearchSurgery(data){
    return this.http.get('http://localhost:3000/surgery/searchsurgery?title='+data.title + '&name='+data.name);
  }

  UpdateSurgeryUse(data){
    return this.http.post('http://localhost:3000/surgery/updatesurgeryuse',data);
    
  }
  UpdateDetailUse(data){
    return this.http.post('http://localhost:3000/surgery/updatedetailuse',data);    
  }

  UpdateSurgeryName(data){
    return this.http.post('http://localhost:3000/surgery/updatesurgeryname',data);    
  }

  UpdateDetailData(data){    
    return this.http.post('http://localhost:3000/surgery/updatedetaildata',data);    
  }

  DeleteCategory(data){
    return this.http.post('http://localhost:3000/surgery/deletecategory',data);    
  }
}
