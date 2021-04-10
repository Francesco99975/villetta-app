import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-screen',
  templateUrl: './success-screen.component.html',
  styleUrls: ['./success-screen.component.scss']
})
export class SuccessScreenComponent {

  eta: string;

  constructor(private router: Router) { 
    this.eta = window.history.state.eta;
  }

  onDone() {
    this.router.navigateByUrl('/', {replaceUrl: true});
  }
}

