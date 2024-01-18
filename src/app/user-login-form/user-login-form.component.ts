// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { getLocaleFirstDayOfWeek } from '@angular/common';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.css'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Name: '', Password: ''};

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}
// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((response) => {
    localStorage.setItem('user',  JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   this.snackBar.open(response, 'OK', {
      duration: 2000
   });
  }, (response) => {
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}

}

