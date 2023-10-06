import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://movies-flix-al-f68cdd84f041.herokuapp.com/';

/**
 * Service for making API requests to manage movies and user data.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Initializes the service with the HttpClient module.
   * @param http The HttpClient module for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user by making a POST request to the registration endpoint.
   * @param userDetails User registration details.
   * @returns An Observable representing the registration response.
   */
  public registerUser(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user by making a POST request to the login endpoint.
   * @param userDetails User login details.
   * @returns An Observable representing the login response.
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + "login?" + new URLSearchParams(userDetails), {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies from the API.
   * @returns An Observable representing the list of movies.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves information about a specific movie by its title.
   * @param title The title of the movie to retrieve.
   * @returns An Observable representing the movie information.
   */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Specifies the content type of the request body
        Accept: 'application/json'          // Specifies the format the server should use for the response
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves movies directed by a specific director.
   * @param director The name of the director.
   * @returns An Observable representing the list of movies by the director.
   */
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${director}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves movies of a specific genre.
   * @param genre The genre to filter by.
   * @returns An Observable representing the list of movies in the genre.
   */
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${genre}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's favorite list.
   * @param movieId The ID of the movie to add to favorites.
   * @returns An Observable representing the updated user data.
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + `users/${user.Username}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError),
    );
  }

  /**
   * Edits user information.
   * @param updatedUser Updated user information.
   * @returns An Observable representing the updated user data.
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user._id, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes the current user's account.
   * @returns An Observable representing the result of the deletion.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${user.Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a movie from a user's favorite list.
   * @param movieId The ID of the movie to remove from favorites.
   * @returns An Observable representing the updated user data.
   */
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const index = user.FavoriteMovies.indexOf(movieId);
    if (index >= 0) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + `users/${user.Username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Checks if a movie is in the user's favorites list.
   * @param movieId The ID of the movie to check.
   * @returns True if the movie is in the favorites list, false otherwise.
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.FavoriteMovies.includes(movieId);
    }
    return false;
  }

  /**
   * Retrieves user information by user ID.
   * @param userId The ID of the user to retrieve.
   * @returns An Observable representing the user information.
   */
  getUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the list of favorite movies for a user.
   * @param userId The ID of the user to retrieve favorites for.
   * @returns An Observable representing the list of favorite movies.
   */
  getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts the response data from an HTTP response.
   * @param res The HTTP response object.
   * @returns The extracted response data.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles HTTP errors and logs them.
   * @param error The HTTP error response.
   * @returns An error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
