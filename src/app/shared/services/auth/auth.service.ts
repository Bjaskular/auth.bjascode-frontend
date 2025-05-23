import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthData } from "../../models/auth-data.model";
import { AppService } from "../app/app.service";
import { AuthHttpService } from "./auth.http.service";
import { NavigationService } from "../navigation/navigation.service";
import { APP_DATA_STORAGE_ITEM_NAME } from "../../consts/consts";
import { HttpErrorResponse } from "@angular/common/http";
import { PageType } from "../../enums/page-type";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _authData$: BehaviorSubject<AuthData | null> = new BehaviorSubject<AuthData | null>(null);

  get authData$(): Observable<AuthData | null> {
    return this._authData$.asObservable();
  }

  constructor(
    private _appService: AppService,
    private _authHttpService: AuthHttpService
  ) {}

  init(): void {
    this._getAuthDataFromStore();
  }

  logIn(email: string, password: string, redirectKey: string | null): void {
    this._appService.setAppLoadingStatus(true);

    this._authHttpService.getUserData(email, password, redirectKey).subscribe({
      next: (data: AuthData) => {
        this._authData$.next(data);
        localStorage.setItem(APP_DATA_STORAGE_ITEM_NAME, JSON.stringify(data));

        if (data.redirect_url) {
          window.location.href = data.redirect_url;
          return;
        }

        console.log('Redirect to default page - next feature');
      },
      error: (response: HttpErrorResponse) => {
        console.error(response);
        this._appService.setAppLoadingStatus(false);
      }
    });
  }

  logOut(): void {
    localStorage.removeItem(APP_DATA_STORAGE_ITEM_NAME);
    this._authData$.next(null);
  }

  private _getAuthDataFromStore(): void {
    const authData: AuthData | null = JSON.parse(localStorage.getItem(APP_DATA_STORAGE_ITEM_NAME) || null);
    this._authData$.next(authData);
    this._appService.setAppLoadingStatus(false);
  }
}
