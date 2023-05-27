import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMarket } from '../models/imarket';
import { IOrder } from '../models/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  Base_URL:String = "https://localhost:7068/api";

  constructor(private http:HttpClient) { }

  getStocks(): Observable<IMarket[]> {
    return this.http.get<IMarket[]>(`${this.Base_URL}/stock`);
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.Base_URL}/order`);
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.Base_URL}/order`, order);
  }
}
