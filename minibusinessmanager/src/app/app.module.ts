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
    AddDishPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
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
    AddDishPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    Contacts,
    DishListProvider
  ]
})
export class AppModule {}
