import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule 
  ]
})
export class Tab2Page {
  inputCategory: string = "";
  inputStock: string = "";
  showNote: boolean = false;
  isFeatured: boolean = false; 

  constructor(private toastController: ToastController) {}

  async onAddButtonClick() {
    if (!this.inputCategory || !this.inputStock) {
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    console.log('Add button clicked!', {
      category: this.inputCategory,
      stock: this.inputStock,
      isFeatured: this.isFeatured,
      showNote: this.showNote,
    });

    const successToast = await this.toastController.create({
      message: 'Item added successfully!',
      duration: 2000,
      color: 'success',
    });
    await successToast.present();
  }
}
