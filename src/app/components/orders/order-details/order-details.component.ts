import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  // here make logic to get details of order by its id but for now use fake id
  // then when make logic of routes and navigation can make that
 // orderId='60534b000f05752430bd2074';
  orderId;

  //    60534b000f05752430bd2074
  constructor(private orderServ:OrderService,private activatedRouter:ActivatedRoute,private router:Router) { 
    
  }

  subscriber;

  orderDetails;

  createdAt;

  // check if admin display this component to allow reject order or not
  checkAdmin=false;

  ngOnInit(): void {

    this.orderId=this.activatedRouter.snapshot.params.id;

    // check if router includes admin
    this.checkAdmin= this.router.url.includes('admin')

   this.subscriber= this.orderServ.getOrderDetailsById(this.orderId).subscribe(

      (data)=>{
        console.log(data)

        this.orderDetails=data;

        this.createdAt=String(new Date(this.orderDetails.createdAt)).split('GMT')[0];
        console.log(this.createdAt)
      },
      (err)=>{

        console.log(err)
      },
      ()=>{

        this.subscriber.unsubscribe();
      }
    )

  }




  // should include message for accept or reject
  messageIncluded='';

  // pass param to function accept order accepted
  acceptOrder(_deliveredDuration){

    if(_deliveredDuration==''){ 
      this.messageIncluded='Should write when it will be delivered' 
      return
  }

  

  this.messageIncluded='';
  
    _deliveredDuration='Order will be delivered at '+_deliveredDuration
   this.subscriber= this.orderServ.adminAcceptOrder(this.orderDetails._id,_deliveredDuration).subscribe(

      (data)=>{

        console.log(data)
        this. orderDetails.status='accepted'
      }
      ,
      (err)=>{

        console.log(err)
      },
      ()=>{
        this.subscriber.unsubscribe();
      }
    )
  }

  // pass param to function accept order accepted

  rejectOrder(_rejectionReason){

    if(_rejectionReason==''){ 
      this.messageIncluded='Should write why order was rejected' 
      return
  }

  this.messageIncluded='';


    this.subscriber= this.orderServ.adminRejectOrder(this.orderDetails._id,_rejectionReason).subscribe(

      (data)=>{

        console.log(data)
       this. orderDetails.status='rejected'
      }
      ,
      (err)=>{

        console.log(err)
      },
      ()=>{
        this.subscriber.unsubscribe();
      }
    )

  }





}
