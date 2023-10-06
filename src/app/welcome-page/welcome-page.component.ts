import { Component, OnInit } from '@angular/core';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * WelcomePageComponent is a component responsible for rendering the welcome page of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Constructor for WelcomePageComponent.
   *
   * @param dialog - An instance of MatDialog for managing dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook called when the component is initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Opens a dialog for user registration.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens a dialog for user sign-in.
   */
  OpenSignInDialog(): void {
    this.dialog.open(SignInFormComponent, {
      width: '280px'
    });
  }
}
