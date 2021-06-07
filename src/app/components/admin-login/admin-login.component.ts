import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {

  // inject admin service
  constructor(private adminServ:AdminService,private router:Router) {

  }

  
  adminDetails;

  ngOnInit(): void {

    this.subscriber= this.adminServ.getDetails().subscribe(

      (data)=>{
  
        this.adminDetails=data;

        this.router.navigateByUrl('admin/order').then(
          ()=>{
            location.reload();
          }
        )
      },
      (err)=>{
  
        this.router.navigateByUrl('/admin/login');
  
      },
      ()=>{
  
        this.subscriber.unsubscribe();
      }
    )


  }

  ngOnDestroy(): void {

  }


  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)])
  })

  subscriber;

  faliedLogin: string = "";

  firstLoginClick=false;

  login(_user, _pass) {

    this.firstLoginClick=true;

    const loginUserInfo = { username: _user.value, password: _pass.value }

   // console.log(loginUserInfo)

    this.subscriber = this.adminServ.login(loginUserInfo).subscribe(

      (data) => {
        console.log(data)
        localStorage.setItem('rafai3Token', data["token"]);

        this.router.navigateByUrl('/admin/order')

         //make page refresh again when navigate from logged in to check authorization and hide
        // logged in and register buttons
        this.router.navigate(['admin/order'])
           .then(() => {
             window.location.reload();
           });

      },
      (err) => {

        console.log(err['error'])
        this.faliedLogin = err['error'].error;
      },
      () => {

        this.subscriber.unsubscribe();
      }

    )

  }


}
