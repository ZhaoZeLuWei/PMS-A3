import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items: any[] = [];

  constructor() {}

  addItem(item: any) {
    this.items.push(item);
  }

  getFeaturedItems() {
    return this.items.filter(item => item.featuredItem === 1);
  }
}
