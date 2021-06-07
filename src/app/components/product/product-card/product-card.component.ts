import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  products: any;
  unsubscriber;
  product = { title: '', imageUrl: '', details: '', price: '', _id:'' };
  showedData;
  flag;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.flag = false;
    this.route.params.subscribe((params) => {
      this.unsubscriber = this.productService
        .getOfCategory(params['filter'])
        .subscribe(
          (res) => {
            this.products = this.showedData = res;
            console.log(res);
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.unsubscriber.unsubscribe();
          }
        );
    });
    this.productService.nameFilterChanged().subscribe((filter) => {
      console.log(filter);
      this.onFiltering(filter);
    });
  }
  onMoreDeatils(value) {
    this.product = value;
  }

  filteredData;
  assignCopy() {
    this.filteredData = Object.assign([], this.products);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredData = Object.assign([], this.products).filter(
      (item) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  onFiltering(title) {
    console.log(title);
    this.filterItem(title);
    if (title === '') {
      this.showedData = this.products;
    } else {
      this.showedData = this.filteredData;
    }
    console.log(this.filteredData);
    if (this.showedData.length == 0) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  addToCart(){
    this.cartService.increseQuantity(this.product._id).subscribe(
      (res)=>{
        console.log(res);
    },
    (err)=>{
      console.log(err);
    }
    );
  }
}
