import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 导入 CommonModule
import { FormsModule } from '@angular/forms';   // 导入 FormsModule
import { IonicModule } from '@ionic/angular';   // 导入 IonicModule
import { ToastController } from '@ionic/angular';
import { Tab2Service } from './tab2.service';
import { Item } from './tab2Item.model';

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
  inputId: string = '';
  inputName: string = '';
  inputCategory: string = '';
  inputQuantity: string = '';
  inputPrice: string = '';
  inputSupplier: string = '';
  inputStock: string = '';
  isFeatured: boolean = false;
  showNote: boolean = false;
  inputNote: string = '';

  constructor(
    private toastController: ToastController,
    private tab2Service: Tab2Service 
  ) {}

  async onAddButtonClick() {
    if (!this.inputId || isNaN(parseInt(this.inputId, 10))) {
      const toast = await this.toastController.create({
        message: 'ID is required and must be an integer.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    if (!this.inputName || typeof this.inputName !== 'string') {
      const toast = await this.toastController.create({
        message: 'Name is required and must be a string.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    if (!this.inputCategory) {
      const toast = await this.toastController.create({
        message: 'Category is required.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    if (!this.inputQuantity || isNaN(parseInt(this.inputQuantity, 10)) || parseInt(this.inputQuantity, 10) <= 0) {
      const toast = await this.toastController.create({
        message: 'Quantity is required and must be a positive integer.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    if (!this.inputPrice || isNaN(parseFloat(this.inputPrice)) || parseFloat(this.inputPrice) <= 0) {
      const toast = await this.toastController.create({
        message: 'Price is required and must be a positive number.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    if (!this.inputStock) {
      const toast = await this.toastController.create({
        message: 'Stock Status is required.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const newItem = {
      item_id: parseInt(this.inputId, 10),
      item_name: this.inputName,
      category: this.inputCategory as any,
      quantity: parseInt(this.inputQuantity, 10),
      price: parseFloat(this.inputPrice),
      supplier_name: this.inputSupplier,
      stock_status: this.inputStock as any,
      featured_item: (this.isFeatured ? 1 : 0) as 0 | 1,
      special_note: this.showNote ? this.inputNote : undefined,
    };

    this.tab2Service.addItem(newItem).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Item added successfully!',
          duration: 2000,
          color: 'success',
        }).then(toast => toast.present());
      },
      error: (err) => {
        console.error('Error adding item:', err);
        this.toastController.create({
          message: 'Failed to add item. Please try again.',
          duration: 2000,
          color: 'danger',
        }).then(toast => toast.present());
      }
    });
  }
}