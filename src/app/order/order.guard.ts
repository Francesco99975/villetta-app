import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(private settingsService: SettingsService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.settingsService.get().ordersAvailable ? true : this.router.createUrlTree(['/']);
  }
  
}
