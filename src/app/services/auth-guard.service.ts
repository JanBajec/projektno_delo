import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    const authInfo = {
      authenticated: true
    };

    if (!authInfo.authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
