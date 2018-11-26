import { AddClientPage } from './../pages/clients/add-client/add-client';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ClientsPage } from '../pages/clients/clients';
import { OrdersPage } from './../pages/orders/orders';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environment/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { Contacts } from '@ionic-native/contacts';
import { SingleClientPage } from '../pages/clients/single-client/single-client';
import { DishesPage } from '../pages/dishes/dishes';
import { AddDishPage } from '../pages/dishes/add-dish/add-dish';
import { DishListProvider } from '../pages/dishes/dish-list';
import { SingleDishPage } from '../pages/dishes/single-dish/single-dish';
import { StockListProvider } from '../pages/stock/stock-list';
import { StockPage } from '../pages/stock/stock';
import { SingleStockPage } from '../pages/stock/single-stock/single-stock';
import { AddStockPage } from '../pages/stock/add-stock/add-stock';
import { PurchaseListProvider } from '../pages/purchases/purchase-list';
import { RecordPurchasePage } from '../pages/purchases/record-purchase/record-purchase';
import { AddPurchaseProvider } from '../pages/purchases/add-purchase';
import { AddOrderPage } from '../pages/orders/add-order/add-order';
import { OrderListProvider } from '../pages/orders/order-list';
import { ClientListProvider } from '../pages/clients/clientList';
import { SingleOrderPage } from '../pages/orders/single-order/single-order';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ClientsPage,
    OrdersPage,
    AddClientPage,
    SingleClientPage,
    DishesPage,
    AddDishPage,
    SingleDishPage,
    StockPage,
    SingleStockPage,
    AddStockPage,
    RecordPurchasePage,
    AddOrderPage,
    SingleOrderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ClientsPage,
    OrdersPage,
    AddClientPage,
    SingleClientPage,
    DishesPage,
    AddDishPage,
    SingleDishPage,
    StockPage,
    SingleStockPage,
    AddStockPage,
    RecordPurchasePage,
    AddOrderPage,
    SingleOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    Contacts,
    DishListProvider,
    StockListProvider,
    PurchaseListProvider,
    AddPurchaseProvider,
    OrderListProvider,
    ClientListProvider
  ]
})
export class AppModule {}
