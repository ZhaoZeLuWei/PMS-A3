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
  // Input fields for item details
  inputId: string = '';
  inputName: string = '';
  inputCategory: string = '';
  inputQuantity: string = '';
  inputPrice: string = '';
  inputSupplier: string = '';
  inputStock: string = '';
  isFeatured: boolean = false; // Featured item toggle
  showNote: boolean = false; // Special note toggle
  inputNote: string = ''; // Special note input

  featuredItems: Item[] = []; // List of featured items
  loading: boolean = true; // Loading state for data fetching

  constructor(
    private toastController: ToastController, // For displaying toast messages
    private tab2Service: Tab2Service // Service to handle API calls
  ) {}

  ngOnInit() {
    this.loadFeaturedItems(); // Load featured items on page init
  }

  // Fetch featured items from the service
  loadFeaturedItems() {
    this.tab2Service.getItems().subscribe({
      next: (data) => {
        console.log('Received raw data:', data);
        data.forEach(item => {
          console.log(`Item Name: ${item.item_name}, Featured Item: ${item.featured_item}`);
        });
        this.featuredItems = data.filter(item => item.featured_item === 1); // Filter only featured items
        console.log('Filtered featured items:', this.featuredItems);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.loading = false;
      }
    });
  }

  // Handle Add Item button click
  async onAddButtonClick() {
    // Validate ID
    if (!this.inputId || isNaN(parseInt(this.inputId, 10))) {
      await this.showToast('ID is required and must be an integer.', 'danger');
      return;
    }

    // Validate Name
    if (!this.inputName || typeof this.inputName !== 'string') {
      await this.showToast('Name is required and must be a string.', 'danger');
      return;
    }

    // Validate Category
    if (!this.inputCategory) {
      await this.showToast('Category is required.', 'danger');
      return;
    }

    // Validate Quantity
    if (!this.inputQuantity || isNaN(parseInt(this.inputQuantity, 10)) || parseInt(this.inputQuantity, 10) <= 0) {
      await this.showToast('Quantity is required and must be a positive integer.', 'danger');
      return;
    }

    // Validate Price
    if (!this.inputPrice || isNaN(parseFloat(this.inputPrice)) || parseFloat(this.inputPrice) <= 0) {
      await this.showToast('Price is required and must be a positive number.', 'danger');
      return;
    }

    // Validate Stock Status
    if (!this.inputStock) {
      await this.showToast('Stock Status is required.', 'danger');
      return;
    }

    // Create new item object
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

    // Call service to add the item
    this.tab2Service.addItem(newItem).subscribe({
      next: () => {
        this.showToast('Item added successfully!', 'success');
        this.resetForm(); // Reset form fields
        this.loadFeaturedItems(); // Refresh featured items list
      },
      error: (err) => {
        console.error('Error adding item:', err);
        this.showToast('Failed to add item. Please try again.', 'danger');
      }
    });
  }

  // Show toast message
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  // Reset all form fields
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