import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  pickup: string;
  tip: string;

  constructor() { }

  loadInfo() {
    this.firstName = localStorage.getItem('first-name') || "";
    this.lastName = localStorage.getItem('last-name') || "";
    this.address = localStorage.getItem('address') || "";
    this.email = localStorage.getItem('email') || "";
    this.phone = localStorage.getItem('phone') || "";
    this.pickup = localStorage.getItem('pickup') || "p";
    this.tip = localStorage.getItem('tip') || "5";
  }

  setInfo(fn: string, ln: string, adr: string, email: string, phone: string, pickup: string, tip: string) {
    this.firstName = fn;
    this.lastName = ln;
    this.address = adr;
    this.email = email;
    this.phone = phone;
    this.pickup = pickup;
    this.tip = tip;
    localStorage.setItem('first-name', fn);
    localStorage.setItem('last-name', ln);
    localStorage.setItem('address', adr);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('pickup', pickup);
    localStorage.setItem('tip', tip);
  }
}
