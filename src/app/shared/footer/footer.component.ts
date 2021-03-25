import { Component, OnInit } from '@angular/core';
import { Settings } from '../models/settings.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  settings: Settings;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.get();
  }

}
