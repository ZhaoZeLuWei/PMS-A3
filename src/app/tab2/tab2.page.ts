import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
export class Tab2Page implements OnInit {
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

  featuredItems: Item[] = [];
  loading: boolean = true;

  constructor(
    private toastController: ToastController,
    private tab2Service: Tab2Service
  ) {}

  ngOnInit() {
    this.loadFeaturedItems(); // 页面加载时获取特色商品数据
  }

  loadFeaturedItems() {
    this.tab2Service.getItems().subscribe({
      next: (data) => {
        console.log('Received raw data:', data);
        // 检查每个项目的 featured_item 值
        data.forEach(item => {
          console.log(`Item Name: ${item.item_name}, Featured Item: ${item.featured_item}`);
        });
        this.featuredItems = data.filter(item => item.featured_item === 1);
        console.log('Filtered featured items:', this.featuredItems);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.loading = false;
      }
    });
  }
  
  async onAddButtonClick() {
    if (!this.inputId || isNaN(parseInt(this.inputId, 10))) {
      await this.showToast('ID is required and must be an integer.', 'danger');
      return;
    }

    if (!this.inputName || typeof this.inputName !== 'string') {
      await this.showToast('Name is required and must be a string.', 'danger');
      return;
    }

    if (!this.inputCategory) {
      await this.showToast('Category is required.', 'danger');
      return;
    }

    if (!this.inputQuantity || isNaN(parseInt(this.inputQuantity, 10)) || parseInt(this.inputQuantity, 10) <= 0) {
      await this.showToast('Quantity is required and must be a positive integer.', 'danger');
      return;
    }

    if (!this.inputPrice || isNaN(parseFloat(this.inputPrice)) || parseFloat(this.inputPrice) <= 0) {
      await this.showToast('Price is required and must be a positive number.', 'danger');
      return;
    }

    if (!this.inputStock) {
      await this.showToast('Stock Status is required.', 'danger');
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
        this.showToast('Item added successfully!', 'success');
        this.resetForm();
        this.loadFeaturedItems(); // 刷新特色商品列表
      },
      error: (err) => {
        console.error('Error adding item:', err);
        this.showToast('Failed to add item. Please try again.', 'danger');
      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  resetForm() {
    this.inputId = '';
    this.inputName = '';
    this.inputCategory = '';
    this.inputQuantity = '';
    this.inputPrice = '';
    this.inputSupplier = '';
    this.inputStock = '';
    this.isFeatured = false;
    this.showNote = false;
    this.inputNote = '';
  }
}