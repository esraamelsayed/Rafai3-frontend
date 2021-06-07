import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient:HttpClient) {

   }
   private baseUrl : string="https://rafai3-backend.herokuapp.com/api/user";

   getToken(){

    let token=localStorage.getItem('rafai3Token')
   return token;
  }

  ///get user details
  getUserDetails(){

    return this._httpClient.get(this.baseUrl,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }

  //////change password
  changePasswordUse(_oldPass,_newPass){
    return this._httpClient.patch(this.baseUrl+'/changePassword',{password:_oldPass ,newPassword: _newPass},{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }

// if user want to edit his details
  editUserDetails(_changeValue){
    return this._httpClient.patch(this.baseUrl+'/update',_changeValue,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }
}
