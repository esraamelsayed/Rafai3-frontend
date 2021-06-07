import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';



@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {


  // inject user service adn router to navigate after change password and activated route to get 
  // username from it
  constructor(private userService: UserService, private router: Router, activatedRoute: ActivatedRoute) {

    // get username from actived route to write in component view
    this.username = activatedRoute.snapshot.params.username



  }

  username;

  newPasswordMatch: string;

  checkConfirmPass: boolean;

  ErrorMsg='';

  editPassForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(8)])
  })


  checknewPassConf(_newPass, _confPass) {

    if (_newPass.value != _confPass.value) {

      this.newPasswordMatch = "confirmation password should match new passowrd"

      this.checkConfirmPass = false;
    } else {

      this.newPasswordMatch = "confirmation passowrd matched new password"

      this.checkConfirmPass = true;
    }
  }

subscriber;


  confirm(_oldPass, _newPass) {

    

    if (this.checkConfirmPass) {

      
      // subscribe to subscriber returned from function of user service made
    this.subscriber=  this.userService.changePasswordUse( _oldPass.value , _newPass.value).subscribe(

        (data:any) => {
          
          if(data.error=='old password is invalid'){

         return this.ErrorMsg=data.error;
          }
          else{
            this.ErrorMsg='';
          }


          console.log(data)

          localStorage.removeItem('rafai3Token');
          // navigate to edit profile page again after user confirmed changed password
          this.router.navigate(['user/login']).then(
            () => {

              this.subscriber.unsubscribe();
              location.reload();
            }
          )


        },
        (err) => {
          

          if (err['error'].error == "authentication failed") {
            this.router.navigateByUrl('authenticationFailed')
          }
        }
      )
    }
  }

  writeOldPass(){
    this.ErrorMsg='';
  }

  ngOnInit(): void {
  }

  // navigate to profile compoennt after changing details of user
  navigateProfile() {

    this.router.navigateByUrl('user/profile')
  }

}
