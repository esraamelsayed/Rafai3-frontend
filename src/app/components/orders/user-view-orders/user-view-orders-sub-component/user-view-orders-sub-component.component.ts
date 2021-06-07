import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-user-view-orders-sub-component',
  templateUrl: './user-view-orders-sub-component.component.html',
  styleUrls: ['./user-view-orders-sub-component.component.css']
})
export class UserViewOrdersSubComponentComponent implements OnInit {

  constructor(private orderServ:OrderService,private router:Router) { }

  ngOnInit(): void {

  

    this.createdAt=this.orderDetails['createdAt'].split('T')[0]
 
  }

  @Input() orderDetails;

  createdAt;

  subscriber;


  confirmCancel='';
  // cancel order by pass its id
  cancelOrder(){

    this.orderServ.userDeleteOrder(this.orderDetails._id).subscribe(
      (data)=>{

        this.confirmCancel='Order is deleted'
      },
      (err)=>{
        
        
        if(err['error'].error=="deletedOrder is not defined"){

         return this.confirmCancel='Order is deleted'
        }

         this.confirmCancel=err['error'].error
      }
    )
  }

}
