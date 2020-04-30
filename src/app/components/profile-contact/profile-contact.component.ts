import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.css']
})
export class ProfileContactComponent implements OnInit {

  profileObject: User;

  contactInfoForm: FormGroup;

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  phone = new FormControl('', [Validators.required,Validators.pattern('^\\d{3}-\\d{3}-\\d{4}$')]);

  errorExists: boolean;
  success: boolean;
  statusExists: boolean;
  statusMessage: string;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {

    this.userService.getUserById2(sessionStorage.getItem('userid')).subscribe(
      (response) => {
        this.profileObject = response;
        this.firstName.setValue(this.profileObject.firstName);
        this.lastName.setValue(this.profileObject.lastName);
        this.email.setValue(this.profileObject.email);
        this.phone.setValue(this.profileObject.phoneNumber);
      }
    );

    this.contactInfoForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    });

  }

  /**
   * Sets the user field of this component to match the currently logged in user as they appear
   * in the database.
   */
  ngOnInit() {
  }

  /**
   * Updates the fields in the profile object to match those of this component, and persists
   * those changes to the database.
   */
  updatesContactInfo() {
    this.profileObject.firstName = this.firstName.value;
    this.profileObject.lastName = this.lastName.value;
    this.profileObject.email = this.email.value;
    this.profileObject.phoneNumber = this.phone.value;

    this.userService.updateUserInfo(this.profileObject).subscribe(
      (response) => { 
        this.statusExists = true;
        this.success = true;
        this.statusMessage = 'Updated Successfully!'; 
      },
      (error) => {
        this.statusExists = true;
        this.errorExists = true;
      }
    );
  }

}