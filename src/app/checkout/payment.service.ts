import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../shared/models/cart.model';
import { environment } from "../../environments/environment";

interface Order {
  items: Item[];
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone: string;
  pickup: boolean;
  tip: number;
  method: string;
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

  pay(payload: Order) {
    return this.http.post(`${environment.PAYMENT_API_URL}/charge`, payload);
  }
}
