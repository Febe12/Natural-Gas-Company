import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Iuser } from '../models/iuser';
import { Warning } from '../models/warning';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject: BehaviorSubject<Iuser[]> = new BehaviorSubject<Iuser[]>([]);
  users$: Observable<Iuser[]> = this.usersSubject.asObservable();

  private warningsSubject: BehaviorSubject<Warning[]> = new BehaviorSubject<Warning[]>([]);
  warnings$: Observable<Warning[]> = this.warningsSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // Users methods
  getAllusers(): Observable<Iuser[]> {
    return this.httpClient.get<Iuser[]>("https://companygas.runasp.net/api/Users").pipe(
      tap(users => this.usersSubject.next(users)),
      catchError(this.handleError)
    );
  }

  getuserbyid(id: any): Observable<Iuser> {
    return this.httpClient.get<Iuser>(`https://companygas.runasp.net/api/Users/GetUserById?id=${id}`).pipe(catchError(this.handleError));
  }
  

  deleteUser(n_users_id: number): Observable<Iuser> {
    return this.httpClient.delete<Iuser>(`https://companygas.runasp.net/api/Users/DeleteUser?id=${n_users_id}`).pipe(
      tap(() => {
        const updatedUsers = this.usersSubject.value.filter(user => user.n_users_id !== n_users_id);
        this.usersSubject.next(updatedUsers);
      })
    );
  }

  // Warnings methods
  getAlldeals(): Observable<Warning[]> {
    return this.httpClient.get<Warning[]>("https://companygas.runasp.net/DTO/feedback-info").pipe(
      tap(warnings => this.warningsSubject.next(warnings))
    );
  }

  deletenotification(n_users_id: number): Observable<Warning> {
    return this.httpClient.delete<Warning>(`https://companygas.runasp.net/api/Deals?id=${n_users_id}`).pipe(
      tap(() => {
        const updatedWarnings = this.warningsSubject.value.filter(warning => warning.n_users_id !== n_users_id);
        this.warningsSubject.next(updatedWarnings);
      })
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.status === 400) {
      errorMessage = error.error || 'Bad request';
    }
    return throwError(errorMessage);
  }
}
