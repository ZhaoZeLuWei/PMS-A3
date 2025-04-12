import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms'; 

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
  standalone: true, 
  imports: [IonicModule, FormsModule], 
})
export class Tab2Page {
  newItem: Item = {
    name: '',
    category: '',
    quantity: null,
    featuredItem: false
  };

  featuredItems: Item[] = []; 

  constructor() {}

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



