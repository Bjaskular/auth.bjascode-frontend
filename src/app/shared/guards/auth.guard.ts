import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { map } from "rxjs";
import { AuthData } from "../models/auth-data.model";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authData$.pipe(
    map((authData: AuthData | null) => {
      if (! authData) {
        router.navigate(["/"]);
        return false;
      }

      return true;
    })
  );
}
