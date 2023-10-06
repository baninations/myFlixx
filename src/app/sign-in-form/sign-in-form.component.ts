import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * SignInFormComponent is a component responsible for handling user login through a form.
 */
@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {

  /**
   * Input property for receiving user login data (Username and Password).
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructor for SignInFormComponent.
   *
   * @param fetchApiData - An instance of FetchApiDataService for making API requests.
   * @param dialogRef - An instance of MatDialogRef for managing the dialog.
   * @param snackBar - An instance of MatSnackBar for displaying snack bar messages.
   * @param router - An instance of Router for navigating to different routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SignInFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Sends the user's login credentials to the backend for authentication.
   * If authentication is successful, it stores user data and token in local storage and navigates to the 'movies' route.
   * Displays success or failure messages in a snack bar.
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("username", JSON.stringify(result.user.Username));
      localStorage.setItem("token", result.token);
      this.router.navigate(['movies']);

      const getUser = localStorage.getItem("user");
      const getToken = localStorage.getItem("token");

      // Logic for a successful user login goes here!
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("Logged in successfully", 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open("Log in failed", 'OK', {
        duration: 2000
      });
    });
  }
}
