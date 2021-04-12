import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../shared/models/cart.model';

interface Order {
  items: Item[];
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone: string;
  pickup: boolean;
  tip: number;
  homeDeliveryCost: number;
  orderPreparationTime: number;
  quantity: number;
  uniqueQuantity: number;
  total: number; 
  tokenId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getStripeSession(payload: Order) {
    return this.http.post('http://localhost:3000/charge', payload);
  }
}
