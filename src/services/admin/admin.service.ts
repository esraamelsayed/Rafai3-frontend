import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClient:HttpClient) { }


  private baseUrl='https://rafai3-backend.herokuapp.com/api/admin'


  // make admin login by data existed in data base .. but not make register logiic as owner create his data in database
  login(_loginDetials){

    return this._httpClient.post(this.baseUrl+'/login',_loginDetials);
  }



  getToken(){

    return localStorage.getItem('rafai3Token')
  }

  // get admin details .. first name .. last name ...
  getDetails(){

    return this._httpClient.get(this.baseUrl,{headers:{Authorization:this.getToken()}})
  }
  

}
