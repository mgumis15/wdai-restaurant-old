import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishComponent } from './components/dish/dish.component';
import { FormComponent } from './components/form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StarsComponent } from './components/stars/stars.component';
import { KoszykComponent } from './components/koszyk/koszyk.component'
import { DishesService } from './services/dishes.service';
import { KoszykDataService } from './services/koszyk-data.service';
import { currencyPipe } from './data/currencyPipe';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SingleDishComponent } from './components/single-dish/single-dish.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth"
import { environment } from '../environments/environment';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthService } from './services/auth.service';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { DishesManagmentComponent } from './components/dishes-managment/dishes-managment.component';
import { UsersService } from './services/users.service';
import { EditFormComponent } from './components/edit-form/edit-form.component';
@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    FormComponent,
    StarsComponent,
    KoszykComponent,
    currencyPipe,
    HomeComponent,
    MenuComponent,
    NavigationComponent,
    PageNotFoundComponent,
    SingleDishComponent,
    LoginComponent,
    RegistrationComponent,
    AdminViewComponent,
    DishesManagmentComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [DishesService,KoszykDataService,AuthService,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
