import { Component } from '@angular/core';
import { DataService } from './data.service';
import {IonicModule, ToastController} from '@ionic/angular';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab2Page {
  newItem: any = {
    featuredItem: 0 // Default to not featured
  };
  featuredItems: any[] = [];

  constructor(private dataService: DataService, private toastCtrl: ToastController) {
    // Load featured items on initialization
    this.updateFeaturedList();
  }

  // Submit form
  async onSubmit() {
    this.dataService.addItem(this.newItem);
    const toast = await this.toastCtrl.create({
      message: 'Record added successfully!',
      duration: 2000
    });
    toast.present();

    this.newItem = { featuredItem: 0 }; // Clear form
    this.updateFeaturedList(); // Update list
  }

  // Update featured items list
  updateFeaturedList() {
    this.featuredItems = this.dataService.getFeaturedItems();
  }
}

