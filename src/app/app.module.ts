import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BarrasComponent } from './barras/barras.component';
import { PointService } from './services/point.service';

@NgModule({
  declarations: [
    AppComponent,
    BarrasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PointService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
