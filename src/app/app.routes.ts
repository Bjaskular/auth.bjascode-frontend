import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    loadComponent: () => import("./site/pages/login/login.component").then(c => c.LoginComponent)
  },
  {
    path: "**",
    redirectTo: "login"
  }
];
