import { Component } from '@angular/core';
import { IonHeader, IonItem, IonContent, IonToolbar, IonTitle, IonLabel } from "@ionic/angular/standalone";

interface Item {
  name: string;
  category: string;
  quantity: number | null;
  featuredItem: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  newItem: Item = {
    name: '',
    category: '',
    quantity: null,
    featuredItem: false
  };

  featuredItems: Item[] = [
    { name: 'Artwork 1', category: 'Painting', quantity: 10, featuredItem: true },
    { name: 'Artwork 2', category: 'Sculpture', quantity: 5, featuredItem: true }
  ];

  allItems: Item[] = [
    { name: 'Artwork 3', category: 'Photography', quantity: 8, featuredItem: false },
    { name: 'Artwork 4', category: 'Digital Art', quantity: 12, featuredItem: false }
  ];

  onSubmit() {
    if (this.newItem.featuredItem) {
      this.featuredItems.push({ ...this.newItem });
    }

    this.newItem = {
      name: '',
      category: '',
      quantity: null,
      featuredItem: false
    };
  }
}



