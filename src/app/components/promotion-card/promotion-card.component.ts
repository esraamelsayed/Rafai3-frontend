import { Component, Input, OnInit } from '@angular/core';
import { MyproductsService } from 'src/services/myproducts/myproducts.service';

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css']
})
export class PromotionCardComponent implements OnInit {

  constructor(private productServ:MyproductsService) { }

  subscriber;

  ngOnInit(): void {

    console.log(this.promotion)
   this.subscriber= this.productServ.getProductById(this.promotion.productId).subscribe(

      (data)=>{

        this.productDetails=data;
        console.log(this.productDetails)


      },
      (err)=>{

        console.log(err)
      },
      ()=>{

        this.subscriber.unsubscribe()
      }
    )
  }

  @Input() promotion;

  productDetails;

}
