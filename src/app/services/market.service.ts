import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMarket } from '../models/imarket';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private hubConnection: signalR.HubConnection;
  Base_URL:String = "https://localhost:7068/api/";
  Stocks:string = "Stock";
  constructor(private http:HttpClient)
  {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7068/stockpricehub') // Replace with your API URL and hub endpoint
    .build();

  this.hubConnection.start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error while connecting to SignalR hub:', err));
  }

  getStocks(): Observable<IMarket[]> {
    return this.http.get<IMarket[]>(this.Base_URL+this.Stocks);
  }

  onStockPriceUpdate(): Observable<{ stockId: number, price: number }> {
    return new Observable<{ stockId: number, price: number }>(observer => {
      this.hubConnection.on('ReceiveStockPriceUpdate', (stockId: number, price: number) => {
        observer.next({ stockId, price });
      });
    });
  }

}
