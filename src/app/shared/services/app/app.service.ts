import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PageType } from "../../enums/page-type";

@Injectable({ providedIn: "root" })
export class AppService {
  private _isAppLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _currentPage$: BehaviorSubject<PageType> = new BehaviorSubject<PageType>(null);

  get isAppLoading$(): Observable<boolean> {
    return this._isAppLoading$.asObservable();
  }

  get currentPage$(): Observable<PageType> {
    return this._currentPage$.asObservable();
  }

  setAppLoadingStatus(isLoading: boolean): void {
    this._isAppLoading$.next(isLoading);
  }

  setCurrentPage(pageType: PageType): void {
    this._currentPage$.next(pageType)
  }

  getCurrentPage(): PageType {
    return this._currentPage$.getValue();
  }
}
