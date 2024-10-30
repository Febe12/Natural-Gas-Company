import { HttpClient, HttpErrorResponse ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl ='https://companygas.runasp.net/api/Auth/UserRegister';
  constructor( private http :HttpClient) { }
  registerUser(user: any) {
    return this.http.post( `${this.baseUrl}/UserRegister`, user)
      .pipe(
        catchError(this.handleError)
      );
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>( `${this.baseUrl}/Auth/CheckEmail`, { email });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.status === 400) {
      errorMessage = error.error || 'Bad request';
    }
    return throwError(errorMessage);
  }

  addUser(data  :any)
{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
return this.http.post<any>(this.baseUrl,data ,{headers}).pipe(
  catchError(this.handleError)

)

}

}