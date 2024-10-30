import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Nav2Component } from './components/nav2/nav2.component';
import { StartComponent } from './components/start/start.component';
import { BillComponent } from './bill/bill.component';
import { BillsComponent } from './components/bills/bills.component';
import { AddnewuserComponent } from './components/addnewuser/addnewuser.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    UserdetailsComponent,
    Nav2Component,
    StartComponent,
    BillComponent,
    BillsComponent,
    AddnewuserComponent,
    NotificationComponent,
    DashboardComponent,
    FilterPipe,
    SignupComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
