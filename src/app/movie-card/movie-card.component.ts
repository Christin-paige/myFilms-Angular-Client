// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component'



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
   
  }

   /**
   * opens a dialog with more information about the movie's genre
   * @param genre
   */

  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreCardComponent, {
      data: {
       title: Genre.Name,
       content: Genre.Description
      }
    })
    };
     /**
   * opens a dialog with more information about the movie's genre
   * @param genre
   */

     openDirectorDialog(Director: any): void {
      this.dialog.open(DirectorCardComponent, {
        data: {
          name: Director.Name,
          bio: Director.Bio,
          birthday: Director.Birth
        }
      })
     }

  }
