import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
//import { Product } from '../model/product.model';

const baseURL = 'https://rafai3-backend.herokuapp.com/api/product/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any;
  private nameFilter: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(baseURL);
  }

  private getToken() {
    let token = localStorage.getItem('rafai3Token');
    console.log(token);
    return token;
  }

  get(id){
    return this.http.get(baseURL + id);
  }

  getOfCategory(filter) {
    return this.http.get(baseURL + 'filter/' + filter);
  }

  add(product) {
    return this.http.post(baseURL, product, {headers:{Authorization:this.getToken()}});
  }

  delete(id) {
    return this.http.delete(baseURL + id, {headers:{Authorization:this.getToken()}});
  }

  edit(id, editedData) {
    return this.http.patch(baseURL + id, editedData, {headers:{Authorization:this.getToken()}});
  }

  onNameFilterChanged(filter) {
    this.nameFilter.next(filter);
  }

  nameFilterChanged() {
    return this.nameFilter.asObservable();
  }
}
