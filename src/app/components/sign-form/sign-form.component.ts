import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css']
})
export class SignFormComponent implements OnInit {

  // dont forget after make connections with other component write ,private router:Router in param
  constructor(private userServ:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  

  firstClick=false;

  subscriber;

  userNameExists: boolean = false;
  emailExists: boolean = false;

  registered: string;

  // after successfully registered hit login to login with created user
  navigateLogin() {

    this.router.navigate(['user/login'])
      .then(() => {
        window.location.reload();
      });
  }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(8)]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age: new FormControl('', [Validators.required, Validators.max(100), Validators.min(8)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(8)])
    // phone: new FormControl('', [ValidatePhone])
  })

  confPass: string = "";
  checkConfPass: boolean = false;

  // check conf password matching password
  validateConfirmPass(_pass, _confPass) {

    if (_pass.value == _confPass.value) {
      this.checkConfPass = true;
      this.confPass = _confPass.value;

    } else {
      this.checkConfPass = false;

    }
  }


  // function register on click
  register(username, email, password, firstname, lastname, age, phone) {

    let gender=this.gender;

    this.firstClick=true;

    if (!this.checkConfPass == true) {
      return
    }
    // make json object of deatils got from form
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
      age: age.value,
      phone: phone.value,
      gender:gender
    }

    // pass json obj to function params of register user
    this.subscriber = this.userServ.register(newUser).subscribe(
      (data) => {
        console.log(data)

        this.userNameExists = false;
        this.emailExists = false;

        this.registered = "Registered successfully "


        
      }, (err) => {

        console.log(err['error']);
        if (err['error'].error.includes('username')) {
          this.userNameExists = true;
        } else {
          this.userNameExists = false;
        }

        if (err['error'].error.includes('email')) {

          this.emailExists = true;
        } else {
          this.emailExists = false;
        }
      }
      ,()=>{

        if (this.subscriber) {

          this.subscriber.unsubscribe();
        }
      }
    )

  }


  gender='';

  chooseGender(_gender){

    this.gender=_gender;

  }



}
