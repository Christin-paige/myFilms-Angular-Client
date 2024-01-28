
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';//allows get movies to finish fetching before getFavoriteMoviesList is called, so it prevents an empty array of Favorite Movies

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
 
})

export class ProfilePageComponent implements OnInit {
 user: any = {};
 FavoriteMovies: any[] = [];
 

 @Input() userData = { Name: '', Password: '', Email: '', Birthday:'', FavoriteMovies:''}

 @Input() movie: any;
 @Input() movies: any;

 
 
 
 

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
   
  ) { }

   /**
   * first this component loaded, it will load the current user data, update localstorage
   */
  ngOnInit(): void {
    forkJoin({ //forkJoin allows both calls to be made simultaneously and wait for both responses before proceeding
      user: this.fetchApiData.getOneUser(),
      movies: this.fetchApiData.getAllMovies()
    }).subscribe(
      (response: any) => {
        this.user = response.user;
        this.movies = response.movies;
        this.userData.Name = this.user.Name;
        this.userData.Email = this.user.Email;
        this.userData.Birthday = this.user.Birthday;
        this.userData.FavoriteMovies = this.user.FavoriteMovies;

        this.getUser();
        this.getFavoriteMoviesList();
        this.getMovies();

      }
    );
  }
//moved getFavoriteMoviesList to the top so it could run before anything else and the movies would populate the browser
  getFavoriteMoviesList(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
      console.log('favorite movies', this.user.FavoriteMovies)
      // Use the filter method to filter movies based on FavoriteMovie
      const favoriteMovies = this.movies.filter((movie)=> {
        return this.userData.FavoriteMovies.includes(movie._id)
      })
      console.log('Favorite Movies: ', favoriteMovies)
      this.FavoriteMovies = favoriteMovies;
      }
  
    )
    };

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
   
  }

  /**
 * Username and token will be taken from localstorage to send a request to the api for the users information
 * User profile page will then be able to display the users favorite movies list and their username, name, email, etc.
   * @returns user's data
   */

getUser(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.userData.Name = this.user.Name;
      this.userData.Email = this.user.Email;
      this.userData.Birthday = this.user.Birthday;
      this.userData.FavoriteMovies = this.user.FavoriteMovies
      
      
      });
    }
      /**
 * This method will update the user's data
 * @returns user's data
 * @returns updated user's data saved to local storage
 * @returns user notified of success
 * @returns user notified of error
 */
  
  updatedUser(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe ((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response)); // Update local storage with the new user data
     this.user = response;
      this.snackBar.open('Profile successfully updated', 'OK', {
        duration: 2000
      });
     
    },  
    (error) => {
      if (error.status === 422) {
        // Handle validation errors, log them, or display to the user
        console.error('Validation error:', error.error);
      } else {
        console.error('Error updating user data:', error);
        this.snackBar.open('Error updating user data', 'OK', {
          duration: 2000
        });
      }
    }
  );
}

}






  






    
   
  
   


 
 









   

  


