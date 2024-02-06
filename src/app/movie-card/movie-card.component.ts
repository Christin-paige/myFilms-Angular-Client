// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';




@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent  {
  @Input() movies:any;
 
  
  @Input() userData = { Name: '', Password: '', Email: '', Birthday:'', FavoriteMovies:''}


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
      this.movies = resp || [];
     
      console.log(this.movies);
      
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
       content: Genre.Description,
       
      }
    })
    };
     /**
   * opens a dialog with more information about the movie's director
   * @param director
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

     /**
      * opens a dialog with a description about the movie
      * @param Description 
      */

     openSynopsisDialog(Description: any): void {
      this.dialog.open(SynopsisCardComponent, {
        data: {
          description: Description
        }
      })
     }

   /**
    * If user clicks the heart icon, the movie will be added to their favorite movie list
    * snackBar will communicate that the movie has been successfully added
    * @param movie 
    */
     addToFavorites(movie: any): void {
      const MovieID = movie._id;
       this.fetchApiData.addFavMovie(MovieID).subscribe(
        
       (response: any) => {
         movie.isSelected=!movie.isSelected;
          movie.notSelected=!movie.isSelected;
         
          window.localStorage.setItem('FavoriteMovies', JSON.stringify(MovieID));
         
        console.log('movie added to favorites', response);
        this.snackBar.open('Movie successully added to Favorite Movies List', 'OK', {
          duration:2000
        })
        },
        
      (error) => {
        console.error('error added movie to favorites:', error);
      }
     )
    
  }
 
 

}
 
  
