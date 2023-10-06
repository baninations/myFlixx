import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * MovieDetailsComponent is a dialog component responsible for displaying detailed information about a movie.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  /**
   * Constructor for MovieDetailsComponent.
   *
   * @param data - An object containing data to be displayed in the dialog.
   *   - `title`: A string representing the title or header of the dialog.
   *   - `content`: A string representing the content or details to be displayed in the dialog.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      content: string,
    }
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   */
  ngOnInit(): void { }

}
