import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@bee/core/authentication/user.service';
import { BeeStorageService } from '@bee/core/service/bee-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {
  isLogin: boolean;
  constructor(private router: Router, private userService: UserService, private storage: BeeStorageService) {
    this.userService.user.subscribe(value => this.isLogin = value.isLogin);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (!this.isLogin) {
    //   // tslint:disable-next-line:no-console
    //   this.storage.set('USER_LOGIN_RETURNED_URL_KEY', state.url).then(r => console.info(r));
    //   this.router.navigate(['/']);
    //   return false;
    // }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
