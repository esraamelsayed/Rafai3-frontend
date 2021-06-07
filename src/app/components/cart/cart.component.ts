import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartservice:CartService,private router:Router) { }



  unsubscriberForCart;

  unsubscriberForItem;

  checkOutDetails;

  products=[];

  continueShoping(){
    
    this.router.navigateByUrl('home')

  }

  ngOnInit(): void {

   this.unsubscriberForCart= this.cartservice.getCartDetails().subscribe(

      (cartDate)=>{

        console.log(cartDate)

        this.checkOutDetails=cartDate;

        // make logic to get item deeetails by its id and append it to products
        cartDate['items'].forEach(element => {
          
          this.products.push(element)

          // get product data from api of product by its id
          this.unsubscriberForItem=this.cartservice.getEachProductDetails(element.productId).subscribe(

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
        
        this.router.navigateByUrl('authenticationFailed')
      //  console.log(err)
      },
      ()=>{
        
        this.unsubscriberForCart.unsubscribe();
     
      }
    )

  }

  decrease(_pId){
    console.log(_pId)

    this.cartservice.decreseQuantity(_pId).subscribe(
      
      (data)=>{
        console.log(data)
        this.checkOutDetails = data;
      },
      (err)=>{

        console.log(err)
      },
      ()=>{
        
      }
    )
  }
  increase(_pId){
    // console.log(_pId)


    this.cartservice.increseQuantity(_pId).subscribe(

      (data)=>{
        console.log(data)
        this.checkOutDetails = data;
      },
      (err)=>{

        console.log(err)
      },
      ()=>{
        
      }
    )
  }

  removeProduct(_pId){
    this.cartservice.removeProduct(_pId).subscribe(
      
      (data)=>{
        console.log(data)
        this.checkOutDetails = data;
      },
      (err)=>{

        console.log(err)
      },
      ()=>{
        
      }
    )
  }
  // make order after press checkout
  checkOut(){

    this.cartservice.confirmCheckOut().subscribe(

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
