import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  // //private hubConnection: signalR.HubConnection;
  // private stockPriceSubject = new Subject<{ stockId: number, price: number }>();

  // stockPrice$ = this.stockPriceSubject.asObservable();

  // constructor(private hubConnection: signalR.HubConnection) { }////////////
  // startConnection(): void {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('your-signalr-hub-url')
  //     .build();

  //   this.hubConnection.start()
  //     .then(() => {
  //       console.log('SignalR connection started.');
  //       this.registerStockPriceUpdateHandler();
  //     })
  //     .catch(err => console.error('Error while starting SignalR connection: ' + err));
  // }

  // private registerStockPriceUpdateHandler(): void {
  //   this.hubConnection.on('ReceiveStockPriceUpdate', (stockId: number, price: number) => {
  //     this.stockPriceSubject.next({ stockId, price });
  //   });
  // }
}
