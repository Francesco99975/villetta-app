import { Injectable } from '@angular/core';
import { Settings } from './models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings;

  constructor() { }

  set(settings: Settings) {
    this.settings = settings;
  }

  get() {
    return this.settings;
  }
}
