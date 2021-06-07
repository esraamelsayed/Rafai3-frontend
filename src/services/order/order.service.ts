import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http'
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private _httpClient:HttpClient) { 

  }

  private baseUrl:string='https://rafai3-backend.herokuapp.com/api/order';

  private cartUrl:string='https://rafai3-backend.herokuapp.com/api/cart'

  private productUrl:string='https://rafai3-backend.herokuapp.com/api/product';

  getToken(){

    let token=localStorage.getItem('rafai3Token')
   return token;
  }


  // get all cart details to make check out with it
  getCartDetails(){
   
    // request on another api/cart to get cart details to make order by it
    return this._httpClient.get(this.cartUrl,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }

  getEachProductDetails(_productId){

    return this._httpClient.get(this.productUrl+'/'+_productId);
  }


  // make order after checkout
  confirmCheckOut(){

    return this._httpClient.post(this.baseUrl,{},{headers:{Authorization:localStorage.getItem('rafai3Token')}});
    
  }


  // get all orders by id got from token.. if admin will return all orders .. if user return his orders
  //        This logic is separated in nodejs in backend
  getAllOrders(){

    return this._httpClient.get(this.baseUrl,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }


  // change status of order by its id  .. depending on button status will be accepted 
  adminAcceptOrder(_orderId,_deliveredDuration){

   return this._httpClient.patch(this.baseUrl+'/'+_orderId+'/status',{status:'accepted',statusmessage:_deliveredDuration},{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }


  // change status of order by its id  .. depending on button status will be  rejected 
  adminRejectOrder(_orderId,_rejectionReason){

   return this._httpClient.patch(this.baseUrl+'/'+_orderId+'/status',{status:'rejected',statusmessage:_rejectionReason},{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }

  // get order details by its Id
  getOrderDetailsById(_orderId){

    return this._httpClient.get(this.baseUrl+'/'+_orderId,{headers:{Authorization:this.getToken()}})
  }



  searchOrderBySpecificDate(_searchDetails){

    return this._httpClient.get(this.baseUrl+'?startDate='+_searchDetails.startDate+'&endDate='+_searchDetails.endDate,{headers:{Authorization:this.getToken()}})
  }


  searchOrderByRangeDate(_searchDetails){

    return this._httpClient.get(this.baseUrl+'?startDate='+_searchDetails.startDate+'&endDate='+_searchDetails.endDate,{headers:{Authorization:this.getToken()}})
  }


  // user delete order if it is pending .. this logic made in backend
  userDeleteOrder(_orderId){

    return this._httpClient.delete(this.baseUrl+'/'+_orderId,{headers:{Authorization:this.getToken()}})
  }

  // getAllOrders(){

  // //  let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTBhOTE1MGNmMDdjZDMwMWI0NDhmOSIsImlhdCI6MTYxNTkzNzYwN30.Nu8mWuzIzeId8kg5jaCvDGhqCcqzO3n30Bmd4cIgCG4"
  //   // return this._httpClient.get('http://localhost:3000/api/order',{headers:{Authorization:localStorage.getItem('rafai3Token')}});
 
  //   return this._httpClient.get('http://localhost:3000/api/order', { observe: "body", headers: new HttpHeaders().set('Authorization',localStorage.getItem('rafai3Token')) });
  // }


}
