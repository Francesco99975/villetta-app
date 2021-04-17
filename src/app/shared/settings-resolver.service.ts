import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { tap, map } from "rxjs/operators";
import { SettingsService } from './settings.service';
import { Settings } from "./models/settings.model"
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsResolverService {

  constructor(private http: HttpClient, private settings: SettingsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.settings.get() == null) {
      return this.http.get(`${environment.DB_API_URL}/preferences/settings`).pipe(
        map((res: any) => JSON.parse(res['settings'])[0]),
        map((item: any) => {
          return new Settings({
            websiteAvailable: item['fields']['website_available'],
            phone: item['fields']['telephone_number'],
            email: item['fields']['email'],
            address: item['fields']['address'],
            facebookLink: item['fields']['facebook_link'],
            instagramLink: item['fields']['instagram_link'],
            homeDelivery: item['fields']['home_delivery_available'],
            homeDeliveryCost: item['fields']['home_delivery_cost'],
            orderPreparationTime: item['fields']['order_preparation_time_in_minutes'],
            monOpn: item['fields']['monday_opening_time'],
            monCls: item['fields']['monday_closing_time'],
            tueOpn: item['fields']['tuesday_opening_time'],
            tueCls: item['fields']['tuesday_closing_time'],
            wedOpn: item['fields']['wednesday_opening_time'],
            wedCls: item['fields']['wednesday_closing_time'],
            thuOpn: item['fields']['thursday_opening_time'],
            thuCls: item['fields']['thursday_closing_time'],
            friOpn: item['fields']['friday_opening_time'],
            friCls: item['fields']['friday_closing_time'],
            satOpn: item['fields']['saturday_opening_time'],
            satCls: item['fields']['saturday_closing_time'],
            sunOpn: item['fields']['sunday_opening_time'],
            sunCls: item['fields']['sunday_closing_time']
          });
        }),
        tap((settings: Settings) => {
          if(!settings.websiteAvailable) {
            this.router.navigateByUrl('/unavailable', {replaceUrl: true});
          }
        }),
        tap((settings: Settings) => this.settings.set(settings))
      );
    }
  }
}
