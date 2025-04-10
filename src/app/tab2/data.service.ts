import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: any[] = [];
  private nextId = 1; // Automatically generate unique ID

  constructor() {
    // Load data from localStorage
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
    this.nextId = this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1;
  }

  private saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  // Add new record
  addItem(item: any) {
    item.id = this.nextId++;
    this.items.push(item);
    this.saveToLocalStorage();
  }

  // Get all featured items (Featured Item = 1)
  getFeaturedItems() {
    return this.items.filter(item => item.featuredItem === 1);
  }
}
