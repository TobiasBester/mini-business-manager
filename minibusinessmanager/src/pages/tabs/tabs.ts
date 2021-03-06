import { Component } from '@angular/core';

import { OrdersPage } from './../orders/orders';
import { ClientsPage } from './../clients/clients';
import { HomePage } from '../home/home';
import { DishesPage } from '../dishes/dishes';
import { StockPage } from '../stock/stock';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  clientsTab = ClientsPage;
  homeTab = HomePage;
  ordersTab = OrdersPage;
  dishesTab = DishesPage;
  stockTab = StockPage;

  constructor() {
    
  }
}
