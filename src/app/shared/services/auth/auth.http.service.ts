import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthHttpService {
  constructor (private _httpClient: HttpClient) {}

  getUserData(email: string, password: string, redirectKey: string | null): Observable<any> {
    return this._httpClient.post<any>(
      "http://localhost:8000/api/login",
      {
        email: email,
        password: password,
        redirect_key: redirectKey,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
  }
}
