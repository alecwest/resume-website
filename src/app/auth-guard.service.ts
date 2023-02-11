import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authenticator: AuthenticatorService) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (this.authenticator.authStatus === 'authenticated') {
        return true;
      } else {
        this.router.navigate(["login"]);
        return false;
      }
  }
}
