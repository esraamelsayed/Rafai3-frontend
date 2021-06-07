import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient:HttpClient) {

   }

   private baseUrl='https://rafai3-backend.herokuapp.com/api/user';

   register(_signUpDetails){

    return this._httpClient.post(this.baseUrl+'/register',_signUpDetails);
   }


   login(_signInDetails){

    return this._httpClient.post(this.baseUrl+'/login',_signInDetails);
   }



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

    console.log({password:_oldPass ,newPassword: _newPass});
    return this._httpClient.patch(this.baseUrl+'/changePassword',{password:_oldPass ,newPassword: _newPass},{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }

// if user want to edit his details
  editUserDetails(_changeValue){
    return this._httpClient.patch(this.baseUrl+'/update',_changeValue,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }

  imageChange(changedImage){
    console.log(changedImage)
    return this._httpClient.patch(this.baseUrl+'/updateImage',changedImage,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }
}
