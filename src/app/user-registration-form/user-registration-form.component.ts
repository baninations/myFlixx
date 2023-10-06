// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { Router } from '@angular/router';
/**
 * UserRegistrationFormComponent is a component responsible for handling user registration through a form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Input property for receiving user registration data (Username, Password, Email, Birthday).
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor for UserRegistrationFormComponent.
   *
   * @param fetchApiData - An instance of FetchApiDataService for making API requests.
   * @param dialogRef - An instance of MatDialogRef for managing the dialog.
   * @param snackBar - An instance of MatSnackBar for displaying snack bar messages.
   * @param router - An instance of Router for navigating to different routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Sends the user's registration data to the backend for creating a new user account.
   * If registration is successful, it closes the registration dialog and displays a success message.
   * Displays a failure message if registration fails.
   */
  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("Signed up successfully", 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open("Failed to Sign up", 'OK', {
        duration: 2000
      });
    });
  }
}
