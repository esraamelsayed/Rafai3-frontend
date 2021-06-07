import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:ActivatedRoute,private adminServ:AdminService,private userServ:UserService,private navRouter:Router) { 

  }


  subscriber;

  // inject both user and admin service then check if user logged in or not and same for admin
  //   to display navbar related to each one ((and add log in or log out in same logic))
  ngOnInit(): void {

  // check if route satart with admin
 this.checkIfAdmin= window.location.href.includes('admin')

 // get data of admin to display .. Admin and hist name
 if(this.checkIfAdmin){

 this.subscriber= this.adminServ.getDetails().subscribe(

    (data)=>{

      this.adminDetails=data;
    },
    (err)=>{

      this.navRouter.navigateByUrl('/admin/login');

    },
    ()=>{

      this.subscriber.unsubscribe();
    }
  )



 }



// get data from user to display welcome and name of user
 if(!this.checkIfAdmin){

 this.subscriber= this.userServ.getUserDetails().subscribe(

    (data)=>{

      
      this.userDetails=data;
    },
    (err)=>{

      console.log(err)
    },
    ()=>{
      
      this.subscriber.unsubscribe();
    }
  )

 }

  }


  logout(){

    localStorage.removeItem('rafai3Token');
    this.userDetails=null;
    this.adminDetails=null;

    this.navRouter.navigateByUrl('home').then(

      ()=>{
        location.reload();
      }
    )
  }


  // in case login check if user or admin to navigate to his login component
  navigateLogin(){

    if(this.checkIfAdmin){

      this.navRouter.navigateByUrl('/admin/login')
      
    }
    
    if(!this.checkIfAdmin){

      this.navRouter.navigateByUrl('/user/login')
      
    }


  }
 


  checkIfAdmin=false;

  userDetails;
  adminDetails;


  adminPage(){

    this.navRouter.navigateByUrl('/admin')
  }


  navigateOurProducts(){

    this.navRouter.navigateByUrl('user/product')
  }


  navigateAdminRoute(){

    this.navRouter.navigateByUrl('admin/login')
  }


}
