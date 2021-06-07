import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { PromotionService } from 'src/services/promotion/promotion.service';

@Component({
  selector: 'app-admin-promotion',
  templateUrl: './admin-promotion.component.html',
  styleUrls: ['./admin-promotion.component.css']
})
export class AdminPromotionComponent implements OnInit {

  constructor(private promotionService: PromotionService, private productService: ProductService) { }

  promotions;
  productPromoted;
  ngOnInit(): void {



    let unsubscriber = this.promotionService.getAll().subscribe(
      (res)=>{
        console.log(res);
        this.promotions = res;
      },
      (err)=>{
        console.log(err)
      },
      ()=>{unsubscriber.unsubscribe()}
    );
  }

  // getPromotedProductDetails(promotion){
  //   console.log(promotion[0])
  //   console.log(promotion[0]['productId'])
  //  let unsubscriber = this.productService.get(promotion[0]['productId']).subscribe(
  //     (res)=>{
  //      this.productPromoted = res;
  //     },
  //     (err)=>{
  //       console.log(err);
  //     },
  //     ()=>{unsubscriber.unsubscribe()}
  //   );
  // }

  onDeletePromotion(promotion) {
    let unsubscriber = this.promotionService.deletePromotion(promotion._id).subscribe(
      (res) => {
        const index = this.promotions.indexOf(promotion, 0);
        if (index > -1) {
          this.promotions.splice(index, 1);
        }
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      ()=>{unsubscriber.unsubscribe()}
    );
  }
  product ;
  captureProduct(value) {
    console.log(value.productId)
    let unsubscriber = this.productService.get(value.productId).subscribe((res)=>{
      this.product = res['product'];
      document.getElementById('closeModalButton9').click();
      console.log(this.product);
    },
    (err) => {
      console.log(err);
    },
    ()=>{
      unsubscriber.unsubscribe();
    }
    )
  }



}
