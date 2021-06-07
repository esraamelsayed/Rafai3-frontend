import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-admin-control-orders-sub-component',
  templateUrl: './admin-control-orders-sub-component.component.html',
  styleUrls: ['./admin-control-orders-sub-component.component.css']
})
export class AdminControlOrdersSubComponentComponent implements OnInit {

  constructor(private orderServ:OrderService) { }

  ngOnInit(): void {

    console.log(this.orderDetails)

    this.createdAt=this.orderDetails['createdAt'].split('T')[0]
    console.log(this.createdAt)
  }

  @Input() orderDetails;

  createdAt;

  subscriber;


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
