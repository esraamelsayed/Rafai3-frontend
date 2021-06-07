import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyproductsService {

  constructor(private _httpClient:HttpClient) { 


  }


  private baseUrl='https://rafai3-backend.herokuapp.com/api/product'


  // get all products
  getAll(){

    return this._httpClient.get(this.baseUrl);
  }
  // get product by id
  getProductById(_productId){

    return this._httpClient.get(this.baseUrl+'/'+_productId);
  }

  // delete product by id
  deleteProductById(_productId){

    return this._httpClient.get(this.baseUrl+'/'+_productId);
  }

  // // update product by id
  // UpdateProductById(){

  //   return this._httpClient.get(this.baseUrl);
  // }

}
