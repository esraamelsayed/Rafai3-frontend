import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css'],
})
export class EditUserDetailsComponent implements OnInit {
  // inject user service .. to navigate to profie component
  constructor(private userService: UserService, private router: Router) {
    this.subscriber = userService.getUserDetails().subscribe(
      (data) => {
        console.log(data);

        this.userProfile = data;

        this.profileForm.setValue({
          firstname: this.userProfile.firstname,
          lastname: this.userProfile.lastname,
          age: this.userProfile.age,
          phone: this.userProfile.phone,
        });
      },
      (err) => {
        console.log(err);

        this.router.navigateByUrl('authenticationFailed');
      },
      () => {
        this.subscriber.unsubscribe();
      }
    );
  }

  subscriber;

  userProfile;

  profileForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.max(100),
      Validators.min(8),
    ]),
    phone: new FormControl('', [ValidatePhone]),
  });

  // navigate to profile compoennt after changing details of user
  navigateProfile() {
    this.router.navigateByUrl('user/profile');
  }

  // pass details changed in form
  confirm(_firstname, _lastname, _age, _phone) {
    const _changedValues = {};

    _firstname.value == ''
      ? null
      : (_changedValues['firstname'] = _firstname.value);
    _lastname.value == ''
      ? null
      : (_changedValues['lastname'] = _lastname.value);
    _age.value == '' ? null : (_changedValues['age'] = _age.value);
    _phone.value == '' ? null : (_changedValues['phone'] = _phone.value);

    this.subscriber = this.userService
      .editUserDetails(_changedValues)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.subscriber.unsubscribe();
        }
      );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  image;
  newImage = new FormData();
  onImageSelected(input) {
    if (input.files && input.files[0]) {
      console.log(input.files[0]);
      this.newImage.append('image', input.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (_event) => {
        this.image = reader.result;
        console.log(this.newImage);
      };
    }
  }

  imageUpload() {
    this.subscriber=this.userService.imageChange(this.newImage).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

// to validate phones  custom validator
function ValidatePhone(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value && control.value.length != 11) {
    return { phoneNumberInvalid: true };
  }
  return null;
}
