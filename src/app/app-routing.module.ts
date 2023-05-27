import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './components/market/market.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path:"",component:MarketComponent},
  {path:"market",component:MarketComponent},
  {path:"order",component:OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
