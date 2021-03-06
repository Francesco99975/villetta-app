import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail-screen',
  templateUrl: './fail-screen.component.html',
  styleUrls: ['./fail-screen.component.scss']
})
export class FailScreenComponent {

  error: string;

  constructor(private router: Router) {
    this.error = window.history.state.error;
    if(this.error.trim() == '') {
      this.error = 'Unknown Error Occurred. We are sorry.'
    }
  }


  onDone() {
    this.router.navigateByUrl('/', {replaceUrl: true});
  }
}
