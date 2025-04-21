import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamePageRoutingModule } from './name-routing.module';

import { NamePage } from './name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NamePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NamePage]
})
export class NamePageModule {}
