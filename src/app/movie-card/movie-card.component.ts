// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * MovieCardComponent is a component responsible for displaying movie cards and managing user interactions with movies.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  /**
   * An array to store movie data retrieved from the API.
   */
  movies: any[] = [];

  /**
   * Constructor for MovieCardComponent.
   *
   * @param fetchApiData - An instance of FetchApiDataService for making API requests.
   * @param dialog - An instance of MatDialog for displaying dialogs.
   * @param snackBar - An instance of MatSnackBar for displaying snack bar messages.
   * @param router - An instance of Router for navigating to different routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * Checks if a user is authenticated and fetches movies data if authenticated.
   * Redirects to the 'welcome' route if not authenticated.
   */
  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  /**
   * Fetches the list of movies from the API and stores them in the 'movies' array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Opens a dialog displaying movie genre details.
   *
   * @param genre - An object containing genre details (Name, Description).
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    });
  }

  /**
   * Opens a dialog displaying movie synopsis.
   *
   * @param synopsis - A string containing the movie's synopsis.
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: "Description",
        content: synopsis,
      }
    });
  }

  /**
   * Opens a dialog displaying director details.
   *
   * @param director - An object containing director details (Name, Bio).
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    });
  }

  /**
   * Checks if a movie is marked as a favorite.
   *
   * @param id - The ID of the movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Removes a movie from the user's favorites list.
   *
   * @param id - The ID of the movie to remove from favorites.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Adds a movie to the user's favorites list.
   *
   * @param id - The ID of the movie to add to favorites.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Added to favorites', 'OK', {
        duration: 2000
      });
    });
  }
}
