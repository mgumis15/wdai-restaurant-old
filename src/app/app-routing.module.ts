import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { KoszykComponent } from './components/koszyk/koszyk.component';
import { FormComponent } from './components/form/form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SingleDishComponent } from './components/single-dish/single-dish.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { DishesManagmentComponent } from './components/dishes-managment/dishes-managment.component';
const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Menu', component: MenuComponent },
  { path: 'Login', component: LoginComponent,canActivate:[AuthGuard] },
  { path: 'Register', component: RegistrationComponent,canActivate:[AuthGuard] },
  { path: 'AdminView', component: AdminViewComponent,canActivate:[AuthGuard] },
  { path: 'DishesManagment', component: DishesManagmentComponent,canActivate:[AuthGuard] },
  { path: 'ShoppingCart', component: KoszykComponent,canActivate:[AuthGuard]},
  { path: 'SingleDish/:id', component: SingleDishComponent,canActivate:[AuthGuard] },
  { path: '', redirectTo:'/Home', pathMatch:'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }