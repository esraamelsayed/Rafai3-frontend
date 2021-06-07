import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-admin-control-orders',
  templateUrl: './admin-control-orders.component.html',
  styleUrls: ['./admin-control-orders.component.css']
})
export class AdminControlOrdersComponent implements OnInit {

  // inject router in ctor
  constructor(private ordersServ:OrderService,private router:Router) { }


  subscriber;

  allOrders;

  ngOnInit(): void {

   this.subscriber= this.ordersServ.getAllOrders().subscribe(
      (data)=>{
        console.log(data)

        this.allOrders=data;
      },
      (err)=>{

        this.router.navigateByUrl('/admin/login')
        console.log(err)
      },
      ()=>{

      this.subscriber.unsubscribe();
      }
    )

  }


  // search by range of date
  searchByDateRange(_startDate, _endDate) {

    // check if user didn't choose startdate or end date
    if (!(_startDate.value && _endDate.value)) { return }
    // this to transform date format to fit that in mongoDB date format
    // const startDate = new Date(new Date(_startDate.value).toString().split('GMT')[0] + ' UTC').toISOString();
    // const endDate = new Date(new Date(_endDate.value).toString().split('GMT')[0] + ' UTC').toISOString();
    const searchDetails = { startDate: _startDate.value, endDate: _endDate.value }

    console.log(searchDetails)

    // subscribe to functon seatch by date in todo service
    this.ordersServ.searchOrderByRangeDate(searchDetails).subscribe(
      (data) => {
        console.log(data)
        this.allOrders = data;
      },
      (err) => {
        console.log(err)
        if (err['error'].error == "authentication failed") {
          // this.router.navigateByUrl('authenticationFailed')
        }

      }
    )

  }




   // search by specific date
   searchBySpecificDate(_specificDate) {

    // check if user didn't choose any date
    if (!_specificDate.value) { return }
    // here get date from input and add one day to it and search by range this day until end of that day
    const currDay = _specificDate.value;

    // get next day in same format
    let nextDayByMS = new Date(currDay).getTime();

    // 24*60*60*1000 to add new day by milliseconds
    nextDayByMS = nextDayByMS + (24 * 60 * 60 * 1000);

    // convert milliseconds to yyyy-mm-dd format  .. this return  liek this 2021-01-02T00:00:00.000Z
    let nextDay = new Date(nextDayByMS).toISOString();

    //split it by T to get first part of prev format
    nextDay = nextDay.split('T')[0];

    const searchDetails = { startDate: currDay, endDate: nextDay }

    // subscribe to functon seatch by date in todo service
    this.ordersServ.searchOrderBySpecificDate(searchDetails).subscribe(
      (data) => {
        console.log(data);
        this.allOrders = data;
      },
      (err) => {
        console.log(err)
        if (err['error'].error == "authentication failed") {
          // this.router.navigateByUrl('authenticationFailed')
        }
      }
    )

  }

}
