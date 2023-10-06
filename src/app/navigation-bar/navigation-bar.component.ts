import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * NavigationBarComponent is a component responsible for rendering the navigation bar of the application.
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  /**
   * Constructor for NavigationBarComponent.
   *
   * @param fetchApiData - An instance of FetchApiDataService for making API requests.
   * @param router - An instance of Router for navigating to different routes.
   */
  constructor(
   public fetchApiData: FetchApiDataService,
   public router: Router
  ) {}

  /**
   * Logs out the current user by removing user-related data from the local storage and navigating to the 'welcome' route.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
