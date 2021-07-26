import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        // console.log("User:")
        // console.log(user)
        if(user == null) {
          return false;
        } else if(user.uid == "M40GjYbccBhBmZw5HENNCctFUfx1") {
          return true;
        } else {
          return false;
        }
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/editor/login']);
        }
    })
    )
  }

}
