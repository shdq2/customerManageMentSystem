import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AppRouterModule } from './app.router.module';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common';
import { DetailComponent } from './detail/detail.component'
import {jqxBarGaugeModule} from 'jqwidgets-ng/jqxbargauge';
import { CalendarComponent } from './calendar/calendar.component';
import { MenuComponent } from './menu/menu.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    CustomerComponent,
    DetailComponent,
    CalendarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRouterModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    jqxBarGaugeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
