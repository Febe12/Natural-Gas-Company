import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://companygas.runasp.net/api/Auth';
  constructor(private http : HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/EmployeeRegister`,userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/login`,loginObj)
  }

}
