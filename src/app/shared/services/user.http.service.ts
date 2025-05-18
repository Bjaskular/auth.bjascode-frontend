import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserHttpService {
  constructor(private _httpClient: HttpClient) { }

  // dataHeaders: HttpHeaders = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  // };

  getUserData(email: string, password: string): Observable<any> {
    return this._httpClient.post<any>(
      'http://localhost:8000/api/login',
      {
        "email": email,
        "password": password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
  }
}
