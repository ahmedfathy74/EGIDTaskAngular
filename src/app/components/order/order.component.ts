import { ModalModule } from 'ngx-bootstrap/modal';
// import { Component, OnInit } from '@angular/core';
// import { IMarket } from 'src/app/models/imarket';
// import { IOrder } from 'src/app/models/iorder';
// import { OrderService } from 'src/app/services/order.service';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   stocks: IMarket[] = [];
//   orders: IOrder[] = [];
//   newOrder: IOrder = {
//     personName: '',
//     stockID: 0,
//     quantity: 0
//   };

//   constructor(private orderService: OrderService) {}

//   ngOnInit() {
//     this.getStocks();
//     this.getOrders();
//   }

//   getStocks() {
//     this.orderService.getStocks().subscribe(stocks => {
//       this.stocks = stocks;
//     });
//   }

//   getOrders() {
//     this.orderService.getOrders().subscribe(orders => {
//       this.orders = orders;
//     });
//   }

//   createOrder() {
//     this.orderService.createOrder(this.newOrder).subscribe(order => {
//       this.orders.push(order);
//       this.newOrder = {
//         personName: '',
//         stockID:0,
//         quantity: 0
//       };
//     });
//   }

//   getOrderStockName(order: number) {
//     const stock = this.stocks.find(s => s.id === order);
//     console.log(order);
//     // console.log(stock?.price);
//     return stock ? stock.stockName : '';
//   }

//   getOrderStockPrice(order: number) {
//     const stock = this.stocks.find(s => s.id === order);
//     return stock ? stock.price : '';
//   }
// }

import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/iorder';
import { IMarket } from 'src/app/models/imarket';
import { OrderService } from 'src/app/services/order.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  stocks: IMarket[] = [];
  orders: IOrder[] = [];
  newOrder: IOrder = {
    orderId:0,
    personName: '',
    stockID: 0,
    quantity: 0,
    price:0
  };

  editedOrder: IOrder = {
    orderId: 0,
    personName: '',
    stockID: 0,
    quantity: 0,
    price: 0
  };
  newOrderModalRef: NgbModalRef | undefined;


  // editedOrder: IOrder | undefined;

  // openEditOrderModal(order: IOrder) {
  //   this.editedOrder = { ...order }; // Create a copy of the order to edit
  //   this.newOrderModalRef = this.modalService.open(this.newOrderModal, { ariaLabelledBy: 'newOrderModal' });
  // }


  constructor(private orderService: OrderService, private modalService: NgbModal) {}

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

  openNewOrderModal(content: any) {
    this.newOrderModalRef = this.modalService.open(content, { ariaLabelledBy: 'newOrderModal' });
  }

  submitNewOrderForm() {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.newOrder = {
        personName: '',
        orderId:0,
        stockID: 0,
        quantity: 0,
        price:0
      };
      if (this.newOrderModalRef) {
        this.newOrderModalRef.close();
      }
    });
  }
  getOrderStockName(order: IOrder) {
    const stock = this.stocks.find(s => s.id === order.stockID);
    return stock ? stock.stockName : '';
  }

  getOrderStockPrice(order: IOrder) {
    const OrderStockPrice = this.orders.find(s => s.price === order.price);
    return OrderStockPrice ? OrderStockPrice.price : '';
  }
  onDeleteOrder(id:number)
  {
    console.log(id);
    let ConfirmDeleteMsg=confirm("Are You Sure For Deleting This Order?!");
    if(ConfirmDeleteMsg){
      this.orderService.DeleteOrder(id).subscribe(
        (done:any)=>{
         this.getOrders()
        },
        (error:any)=>{console.log(error);}
      )
    }
  }
  openEditOrderModal(content: any, order: IOrder) {
    this.editedOrder = { ...order };
    this.modalService.open(content, { ariaLabelledBy: 'editOrderModal' });
  }

  submitEditOrderForm() {
    this.orderService.updateOrder(this.editedOrder).subscribe(() => {
      // Update the order in the list
      const index = this.orders.findIndex(order => order.orderId === this.editedOrder.orderId);
      if (index !== -1) {
        this.orders[index] = { ...this.editedOrder };
      }
      this.getOrders();
      // Close the modal
      this.modalService.dismissAll();
    });
  }
}








