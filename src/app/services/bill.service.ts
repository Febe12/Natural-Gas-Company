import { HttpClient, HttpErrorResponse ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private baseUrl ='https://companygas.runasp.net/api/Bills';
  constructor( private http :HttpClient) { }
send(userbill: any) {
    // return this.http.post<any>(this.baseUrl, userData);
    console.log('Sending user data to backend:', userbill); // Log the user data
    return this.http.post(`${this.baseUrl}/Users`, userbill)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      // Backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
addbill(bill  :any)
{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
return this.http.post<any>(this.baseUrl,bill ,{headers}).pipe(
  catchError(this.handleError)

)

}
}
