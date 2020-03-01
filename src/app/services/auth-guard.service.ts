import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private token: string;

  constructor(
    private router: Router,
    private storage: Storage,
    private jwtService: JwtHelperService,
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot) {
    let authenticated: boolean = false;

    if (this.storage != undefined) {
      this.token = await this.storage.get("access_token");
    }

    if (
      this.token == "" ||
      this.token == undefined ||
      this.token == null ||
      this.jwtService.isTokenExpired(this.token)
    ) {
      authenticated = false;
      this.router.navigateByUrl('/login');
    } else {
      authenticated = true;
    }

    return authenticated;
  }
}
