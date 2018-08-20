import { TabsComponent } from './tabs/tabs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'addClient', loadChildren: './add-client/add-client.module#AddClientPageModule' },
  { path: 'clients', loadChildren: './clients/clients.module#ClientsPageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'stockItems', loadChildren: './stock-items/stock-items.module#StockItemsPageModule' },
  { path: 'dishes', loadChildren: './dishes/dishes.module#DishesPageModule' },
  { path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'stockItems',
        outlet: 'one',
        loadChildren: './stock-items/stock-items.module#StockItemsPageModule'
      },
      {
        path: 'clients',
        outlet: 'two',
        loadChildren: './clients/clients.module#ClientsPageModule'
      },
      {
        path: 'home',
        outlet: 'three',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: 'orders',
        outlet: 'four',
        loadChildren: './orders/orders.module#OrdersPageModule'
      },
      {
        path: 'dishes',
        outlet: 'five',
        loadChildren: './dishes/dishes.module#DishesPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
