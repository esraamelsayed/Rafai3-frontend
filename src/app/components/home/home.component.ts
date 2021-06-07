import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { PromotionService } from 'src/services/promotion/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private promotionService: PromotionService, private productService: ProductService) { }
  promotions:any;
  products=[];
  ngOnInit(): void {
    let unsubscribe = this.promotionService.getAll().subscribe(
      (res)=>{
        this.promotions = res;

      },
      (err)=>{
        console.log(err);
      },
      () => {
        this.getProducts();
        unsubscribe.unsubscribe();
      }
    );

  }

  getProducts(){
    for(var i=0; i < this.promotions.length; i++) {
      let unsubscribe2 = this.productService.get(this.promotions[i].productId).subscribe(
        (res)=>{
          this.products.push(res['product']);
        },
        (err)=>{
          console.log(err);
        },
        ()=>{
          unsubscribe2.unsubscribe();
        }
      );
    }
    console.log(this.products);
  }
}
