import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-failed',
  templateUrl: './authentication-failed.component.html',
  styleUrls: ['./authentication-failed.component.css']
})
export class AuthenticationFailedComponent implements OnInit {

  // inject router to navigate to login or register page when authentication error
  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  navigateLogin() {

    this.router.navigateByUrl('user/login')
  }

  navigateRegister() {


    this.router.navigateByUrl('user/register')
  }

  

}
