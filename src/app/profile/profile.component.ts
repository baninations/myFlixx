import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = { _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: [] }

/**
 * ProfileComponent is a component responsible for displaying and editing user profile information.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  /**
   * A User object representing the user's profile data.
   */
  user: User = {};

  /**
   * Input property for receiving user data to display and edit.
   */
  @Input() userData = { Username: '', Password: '', Email: ''};
  
  /**
   * Constructor for ProfileComponent.
   *
   * @param fetchApiData - An instance of FetchApiDataService for making API requests.
   * @param snackBar - An instance of MatSnackBar for displaying snack bar messages.
   * @param router - An instance of Router for navigating to different routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * Fetches the user's profile data from local storage and sets up the initial values for the component.
   * Redirects to the 'welcome' route if the user is not authenticated.
   */
  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Email: user.Email || "",
      Password: ""
    }
  }

  /**
   * Retrieves the user's profile data from local storage.
   *
   * @returns A User object representing the user's profile data.
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Updates the user's profile information by making an API request.
   * Displays a success message in a snack bar upon successful update.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result))
      this.user = result;
      this.snackBar.open('User updated!', 'OK', {
        duration: 2000
      })
    })
  }
}
