import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    });
  }
}
