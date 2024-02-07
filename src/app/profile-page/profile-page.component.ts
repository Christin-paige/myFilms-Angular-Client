
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';//allows get movies to finish fetching before getFavoriteMoviesList is called, so it prevents an empty array of Favorite Movies

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
 
})

export class ProfilePageComponent implements OnInit {

 @Input() userData = { Name: '', Password: '', Email: '', Birthday:'', FavoriteMovies:''}


 user: any = {};
 FavoriteMovies: any[] = [];
 updateUser = {Name: '', Password: '', Email: '', Birthday:''}


 //@Input() movie: any;
 @Input() movies: any;
 

/**
 * The constructor sets up the environment with the service and dependencies
 * @param fetchApiData 
 * @param router 
 * @param snackBar 
 * @param dialog 
 */

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
    forkJoin({                                     //forkJoin allows both calls to be made simultaneously and wait for both responses before proceeding
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

  /**
   * moved getFavoriteMoviesList to the top so it could run before anything else and the movies would populate the browser
   * @returns user's favorite movie list
   */

  getFavoriteMoviesList(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {

      this.user = response;
      console.log('this user', this.user)
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
      console.log('favorite movies', this.user.FavoriteMovies)

      // Used the filter method to filter movies based on FavoriteMovie
      const favoriteMovies = this.movies.filter((movie)=> {
        return this.userData.FavoriteMovies.includes(movie._id)
      })
      console.log('Favorite Movies: ', favoriteMovies)
      this.FavoriteMovies = favoriteMovies;
      }
  
    )
    };

    /**
     * deletes favorite movie from user's list of favorite movies
     * snackBar tells user that movie has been deleted and when page is refreshed, movie will be removed
     * @param movie 
     */

   deleteFavMovie(movie: any): void {
    const MovieID = movie._id;
   this.fetchApiData.deleteFavoriteMovie(this.user.Name, movie._id).subscribe((response: any) => {
    localStorage.removeItem('FavoriteMovies')
   
   movie.isSelected=movie.isSelected;
   movie.isSelected=!movie.isSelected;
   window.location.reload()
   this.snackBar.open('Movie successfully deleted from Favorite Movies List', 'OK', {
    duration: 2000
   });

   })
   console.log('Movie deleted: ', MovieID)
    }

   
/**
 * @returns all movies for getFavoriteMoviesList() to filter
 */
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

  
  updatedUser(): void {

    //get current user info from local storage
    let currentUser = localStorage.getItem('user')
    console.log('current username', currentUser)

    //handles if user is not logged in
    if (!currentUser){
      console.log('username not found')
      return;
    }

    //extract username from current user format
    const username = currentUser && JSON.parse(currentUser).Name;

    //calls the service to update user information
       this.fetchApiData.updateUserInfo(username, this.userData).subscribe((response) => {
          console.log('user updated correctly',response)

          //update the userData object with the response
          if(response && response.Name) {
            this.userData.Name = response.Name;
          }
          
          localStorage.setItem('user', JSON.stringify(this.userData));        //updating entire user object
        console.log('profile updated user: ', this.userData.Name);

        window.location.reload()
          this.snackBar.open('profile successully updated', 'OK', {
            duration:2000
           
         })
      
         })
        }
      }
       
        
  
      
        

   
  



  










    
   
  
   


 
 









   

  


