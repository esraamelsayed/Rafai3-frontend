import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  constructor(private orderServ:OrderService) { 


  }

  unsubscriberForCart;

  unsubscriberForItem;

  checkOutDetails;

  products=[];

  ngOnInit(): void {

   
   this.unsubscriberForCart= this.orderServ.getCartDetails().subscribe(

      (cartDate)=>{
     
        console.log(cartDate)

        this.checkOutDetails=cartDate;

        // make logic to get item deeetails by its id and append it to products
        cartDate['items'].forEach(element => {
          
          this.products.push(element)

          // get product data from api of product by its id
          this.unsubscriberForItem=this.orderServ.getEachProductDetails(element.productId).subscribe(

            (data)=>{

              this.products.push(data)
            },
            (err)=>{

              console.log(err);
            },
            ()=>{
              this.unsubscriberForItem.unsubscribe();
            }
          )

        });

        console.log(this.products)
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        
        this.unsubscriberForCart.unsubscribe();
     
      }
    )

  }


  // make order after press checkout
  checkOut(){

    this.orderServ.confirmCheckOut().subscribe(

      (data)=>{
        console.log(data)
      },
      (err)=>{

        console.log(err)
      },
      ()=>{
        
      }
    )
  }

}
