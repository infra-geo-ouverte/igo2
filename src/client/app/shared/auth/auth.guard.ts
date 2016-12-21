import { Injectable }             from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { AuthService }            from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.logged) { return true; }
    this.authService.redirectUrl = state.url;
    this.router.navigateByUrl('/login');
    return false;
  }
}
