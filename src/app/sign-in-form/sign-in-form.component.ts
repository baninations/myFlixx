import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})

export class SignInFormComponent {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SignInFormComponent>,
    public snackBar: MatSnackBar) { }

    
//This is the function responsible for sending the form inputs to the backend
userLogin(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    console.log(result)
    localStorage.setItem("user", JSON.stringify(result.user))
    localStorage.setItem("token", JSON.stringify(result.token))

    const getUser = localStorage.getItem("user")
    const getToken = localStorage.getItem("token")

    console.log("User is: ", getUser)
    console.log("Token is: ", getToken)
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
