import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from "@angular/common/http";
import {Observable,throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../environments/environment";

interface Item{
  item_id: number;
  item_name: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featured_item:0|1;
  special_note:string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl; //API address

  constructor(private http: HttpClient) {
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl) // 获取所有商品
      .pipe(
        catchError(this.handleError) // Error handling
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client error
      console.error('An error occurred:', error.error); //  Output error message
    } else {
      // Server error
      console.error(`Backend returned code ${error.status}, body was: `, error.error); // Output error messages
    }
    // Returns an Observable with a user-friendly error message
    return throwError(() => new Error('Something bad happened; please try again later.')); // Throwing an error
  }

  private items: any[] = [];

  addItem(item: any) {
    this.items.push(item);
  }

  getFeaturedItems() {
    return this.items.filter(item => item.featured_item === 1);
  }
}
