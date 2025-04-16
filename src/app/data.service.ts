import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from "@angular/common/http";
import {Observable,throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../environments/environment";

interface Item{
  item_id: number; // 商品ID
  item_name: string; // 商品名称
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous'; // 商品类别
  quantity: number; // 数量
  price: number; // 价格
  supplier_name: string; // 供应商名称
  stock_status: 'In Stock' | 'Low Stock' | 'Out of Stock'; // 库存状态
  featured_item:0|1; // 是否推荐
  special_note:string; // 备注
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl; // API地址

  constructor(private http: HttpClient) {
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl) // 获取所有商品
      .pipe(
        catchError(this.handleError) // 错误处理
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // 客户端错误
      console.error('An error occurred:', error.error); // 输出错误信息
    } else {
      // 服务器错误
      console.error(`Backend returned code ${error.status}, body was: `, error.error); // 输出错误信息
    }
    // 返回一个带有用户友好的错误信息的 Observable
    return throwError(() => new Error('Something bad happened; please try again later.')); // 抛出错误
  }

  private items: any[] = []; // 存储商品

  addItem(item: any) {
    this.items.push(item); // 添加商品
  }

  getFeaturedItems() {
    return this.items.filter(item => item.featured_item === 1); // 获取推荐商品
  }
}