import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private userServ:UserService,private router:Router) { }

  ngOnInit(): void {
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

    console.log(loginUserInfo)

    this.subscriber = this.userServ.login(loginUserInfo).subscribe(

      (data) => {
        console.log(data)
        localStorage.setItem('rafai3Token', data["token"]);

        this.router.navigate([''])
        .then(() => {
          window.location.reload();
        });

        // //make page refresh again when navigate from logged in to check authorization and hide
        // // logged in and register buttons
        // this.router.navigate(['home'])
        //   .then(() => {
        //     window.location.reload();
        //   });

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
