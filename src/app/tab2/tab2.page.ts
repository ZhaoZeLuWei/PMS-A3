import { Component } from '@angular/core';
import { DataService } from './data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
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

