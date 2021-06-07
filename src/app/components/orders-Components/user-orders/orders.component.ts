import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService:OrderService) { }


orders;

  ngOnInit(): void {
  
    // this.orderService.getAllPromotions().subscribe(
    //   (data)=>{
    //     console.log(data)
    //this.orders=data;
    //   },
    //   (err)=>{

    //     console.log(err)
    //   },
    //   ()=>{
    //     console.log("completed")
    //   }
    // )

    // this.orderService.getAllPromotions().subscribe(

    //   (data)=>{
    //     console.log(data)
    //   }
    // )
//////////////////////////////////////////////
    // this.orderService.getAllOrders().subscribe(
    //   (data)=>{
    //     console.log('dddssssssssss')
    //     console.log(data)
    //   }
    // )
////////////////////////////




  // this.orderService.loginUser();
   

    // this.orderService.getAllOrders().subscribe(

    //   (data)=>{
    //    this.orders=data;
    //     console.log(data);
    //   },
    //   (err)=>{
    //     console.log(err)
    //   },
    //   ()=>{

    //   }
    // )


    // this.orderService.loginUser();
  }



}
