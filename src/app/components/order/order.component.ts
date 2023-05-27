// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent {

// }
// order-screen.component.ts

// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { IOrder } from 'src/app/models/iorder';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   orders: IOrder[] = [];
//   newOrder: any ={id:0,
//     quantity:0,
//     personName:"",
//     price:0,
//     stockID:0,
//     stockName:""};

//   constructor(private http: HttpClient) { }

//   // ngOnInit(): void {
//   //   this.fetchOrders();
//   // }

//   // fetchOrders(): void {
//   //   this.http.get<IOrder[]>('https://localhost:7068/api/Order').subscribe(
//   //     orders => this.orders = orders,
//   //     error => console.log('Error fetching orders: ' + error),
//   //   );
//   // }

//   // createOrder(): void {
//   //   this.http.post<IOrder>('https://localhost:7068/api/Order/CreateOrder', this.newOrder).subscribe(
//   //     order => {
//   //       console.log('Order created: ' + order.id);
//   //       this.fetchOrders();
//   //     },
//   //     error => console.log('Error creating order: ' + error)
//   //   );
//   // }
//// }
import { Component, OnInit } from '@angular/core';
import { IMarket } from 'src/app/models/imarket';
import { IOrder } from 'src/app/models/iorder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  stocks: IMarket[] = [];
  orders: IOrder[] = [];
  newOrder: IOrder = {
    personName: '',
    stockID: 0,
    quantity: 0
  };

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getStocks();
    this.getOrders();
  }

  getStocks() {
    this.orderService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  getOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  createOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.newOrder = {
        personName: '',
        stockID:0,
        quantity: 0
      };
    });
  }

  getOrderStockName(order: number) {
    const stock = this.stocks.find(s => s.id === order);
    console.log(order);
    // console.log(stock?.price);
    return stock ? stock.stockName : '';
  }

  getOrderStockPrice(order: number) {
    const stock = this.stocks.find(s => s.id === order);
    return stock ? stock.price : '';
  }
}
