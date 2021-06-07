// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   constructor(private cartClient:HttpClient) {
     
//    }
//    private baseUrl : string="http://localhost:3000/api/cart";
//   //  gettoken(){
//   //    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTA4ZDJlOTFiNjc5NWIyMDAwMmJlZiIsImlhdCI6MTYxNTkzNjU5MX0.DJ8jZ3owPXI7pM6BENCUSo7kXpIJjzV0D2WB6Wxz5_c";
//   //    return token;
//   //  }
// // admin(){
// //   var ad={
// //     username:"esra2_mohamed ",
// //     password:123456789
// //   }
// //   return ad;
// // }

//   //  token(){
//   //   return JSON.parse('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTA4ZDJlOTFiNjc5NWIyMDAwMmJlZiIsImlhdCI6MTYxNTkzNjU5MX0.DJ8jZ3owPXI7pM6BENCUSo7kXpIJjzV0D2WB6Wxz5_c')
//   //  }
//   // login(){
//   //   var x = this.cartClient.post(
//   //     `${this.baseUrl}`,this.admin());
//   //     console.log(x);
//   //     return x;
//   // }
//   getCart(){

//     //  let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTBhOTE1MGNmMDdjZDMwMWI0NDhmOSIsImlhdCI6MTYxNTkzNzYwN30.Nu8mWuzIzeId8kg5jaCvDGhqCcqzO3n30Bmd4cIgCG4"
//       // return this.orderClient.get('http://localhost:3000/api/order',{headers:{Authorization:localStorage.getItem('rafai3Token')}});
   
//       return this.cartClient.get(this.baseUrl, { observe: "body", headers: new HttpHeaders().set('Authorization',localStorage.getItem('rafai3Token')) });
//     }
//   // getcartbyid(userToken){
//   //   var x = this.cartClient.get(
//   //     `${this.baseUrl}`,{headers: new HttpHeaders().get('Authentication', )})
//   //     return x;
//   // }

// }

// // {headers:new HttpHeaders().set('authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTBhMzk5NmU3ZGU0ZmVkNmEwMzIxZCIsImlhdCI6MTYxNjAwMjAzOH0.pYYlhXgHixCEeF4Tvo8tVnLPEa4-bnnRvg2TFAA7jZ8'),observe:'response'}
import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http'
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  ///increase quantity
  // increaseQuantity(_productId){
  //   return this._httpClient.post(this.cartUrl+'/'+_productId,{headers:{Authorization:localStorage.getItem('rafai3Token')}});

  // }
  increseQuantity(_productId){
    return this._httpClient.post(this.cartUrl+'/'+_productId,{},{headers:{Authorization:localStorage.getItem('rafai3Token')}});

  }

  ////decrease quantity
  decreseQuantity(_productId){
    return this._httpClient.delete(this.cartUrl+'/'+_productId,{headers:{Authorization:localStorage.getItem('rafai3Token')}});

  }

  //////remove product from cart
  removeProduct(_productId){
    return this._httpClient.delete(this.cartUrl+'/removeAll/'+_productId,{headers:{Authorization:localStorage.getItem('rafai3Token')}});
  }




  // getAllOrders(){

  // //  let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTBhOTE1MGNmMDdjZDMwMWI0NDhmOSIsImlhdCI6MTYxNTkzNzYwN30.Nu8mWuzIzeId8kg5jaCvDGhqCcqzO3n30Bmd4cIgCG4"
  //   // return this._httpClient.get('http://localhost:3000/api/order',{headers:{Authorization:localStorage.getItem('rafai3Token')}});
 
  //   return this._httpClient.get('http://localhost:3000/api/order', { observe: "body", headers: new HttpHeaders().set('Authorization',localStorage.getItem('rafai3Token')) });
  // }


}
