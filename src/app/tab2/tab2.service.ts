import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './tab2Item.model';

@Injectable({
  providedIn: 'root'
})
export class Tab2Service {
  private scuURL = 'https://prog2005.it.scu.edu.au/ArtGalley/';

  constructor(private http: HttpClient) {}

  // Add a new item to the server
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.scuURL, item);
  }

  // Fetch all items from the server
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.scuURL}`);
  }
}
