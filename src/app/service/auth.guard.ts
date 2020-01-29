import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    const value = this.auth.isAuthenticated();
    if (!value) {
      this.router.navigate(['/login']);
    }
    return value;
  }
}
