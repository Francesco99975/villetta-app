import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() checkout: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onOrder() {
    console.log("Here");
    this.router.navigateByUrl('/order');
  }

}
