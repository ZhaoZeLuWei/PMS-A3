import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "./tab3Item.model";


@Injectable({
  providedIn: 'root'
})
export class Tab3Service {
  private scuURL = 'https://prog2005.it.scu.edu.au/ArtGalley/';

  constructor(private http: HttpClient) { }
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.scuURL);
  }

  deleteItem(name: string) {
    return this.http.delete(`${this.scuURL}/${name}`);
  }

  updateItem(item:Item): Observable<Item> { // update an item
    return this.http.put<Item>(this.scuURL+"/"+ item.item_name, item);
  }
}
