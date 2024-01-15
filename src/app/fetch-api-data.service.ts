import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myfilms-2457a2cd41b6.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

//user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


//get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 
//get one movie
getOneMovie(Title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies' + Title, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//get director
getDirector(directorName:String): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/directors' + directorName, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//get genre
getGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies.genres' + genreName, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//get user
getUser(Name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users' + Name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//add a movie to favorite movies
addFavoriteMovie(Name: string, MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users' + Name + 'movies' + MovieID, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//edit user
updateUserInfo(Name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users' + Name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//delete user
deleteUserInfo(Name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users' + Name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//delete movie from user's favorites
deleteFavoriteMovie(Name: string, MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + Name + 'movies/' + MovieID, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

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
export class FetchApiDataService {

  constructor() {
   
   }
}
