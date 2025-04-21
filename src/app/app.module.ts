import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './data.service';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {HelpModalComponent} from "./help-modal/help-modal.component"; // 必须导入



@NgModule({
  declarations: [AppComponent, HelpModalComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

