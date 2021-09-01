import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.scss']
})
export class UnavailableComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onDone() {
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

}
