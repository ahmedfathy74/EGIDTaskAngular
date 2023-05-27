// import { Component, OnInit } from '@angular/core';
// import { IMarket } from 'src/app/models/imarket';
// import { MarketService } from 'src/app/services/market.service';

// @Component({
//   selector: 'app-market',
//   templateUrl: './market.component.html',
//   styleUrls: ['./market.component.css']
// })
// export class MarketComponent implements OnInit {
//     stocks: IMarket[] = [];
//     constructor(private marketService: MarketService)
//     {
//     }
//     ngOnInit() {
//       this.marketService.getStocks().subscribe(stocks => {
//         this.stocks = stocks;
//       });

//       this.marketService.onStockPriceUpdate().subscribe(update => {
//         const stockToUpdate = this.stocks.find(stock => stock.id === update.stockId);
//         if (stockToUpdate) {
//           stockToUpdate.Price = update.price;
//         }
//       });
//     }

// }
// market-screen.component.ts

import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
 import { IMarket } from 'src/app/models/imarket';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  stocks: IMarket[] = [];
  private hubConnection: signalR.HubConnection | undefined;

  constructor() { }

  ngOnInit(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7068/stockpricehub')
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connected to SignalR hub');
      this.hubConnection?.on('ReceiveStockPriceUpdate', (newstocks: IMarket[]) => {
        this.stocks = newstocks;
      });

    }).catch((err) => {
      console.log('Error connecting to SignalR hub: ' + err);
    });
  }
  hoverCard(stock: IMarket) {
    stock.isHovered = true;
  }

  resetCard(stock: IMarket) {
    stock.isHovered = false;
  }
}
