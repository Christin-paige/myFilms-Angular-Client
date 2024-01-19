import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myfilms-2457a2cd41b6.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
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
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


//get all movies
  public getAllMovies(): Observable<any> {
    console.log('getallmovies called')
    const token = localStorage.getItem('token');
    console.log('Token', token)
    return this.http.get<Response>(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 
//get one movie
public getOneMovie(Title: string): Observable<any>{
  const token = localStorage.getItem('token');
  return this.http.get<Response>(apiUrl + 'movies/' + Title, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//get director
public getDirector(directorName:String): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get<Response>(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//get genre
public getGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get<Response>(apiUrl + 'genre', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//get user
public getUser(Name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get<Response>(apiUrl + 'users/' + Name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//add a movie to favorite movies
public addFavoriteMovie(Name: string, MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post<Response>(apiUrl + 'users/' + Name + '/movies/' + MovieID, {headers: new HttpHeaders(
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
  return this.http.put<Response>(apiUrl + 'users/' + Name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//delete user
public deleteUserInfo(Name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete<Response>(apiUrl + 'users/' + Name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
//delete movie from user's favorites
public deleteFavoriteMovie(Name: string, MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete<Response>(apiUrl + 'users/' + Name + '/movies/' + MovieID, {headers: new HttpHeaders(
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
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}