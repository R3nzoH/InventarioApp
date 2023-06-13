import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AddOffersComponent } from './components/add-offers/add-offers.component';
import { EditOffersComponent } from './components/edit-offers/edit-offers.component';
import { HomeComponent } from './components/home/home.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: ListOffersComponent },
  { path: 'admin/offers/new', component: AddOffersComponent },
  { path: 'admin/offers/edit/:id', component: EditOffersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration',component: RegistrationComponent},
  { path: '',redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
