import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/data.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  originalData: any[] = [];    // 原始数据
  filteredData: any[] = [];    // 过滤后数据
  searchTerm: string = '';     // 搜索关键词
  isLoading: boolean = false;  // 加载状态
  error: string = '';          // 错误信息
  selectedItemDetails: string = ''; // 存储搜索结果的详细信息
  // 新增属性
  showDetails: boolean = true;

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading items...',
      translucent: true,
    });
    await loading.present();

    this.apiService.getAllItems().subscribe(
      (data: any[]) => {
        this.originalData = data;
        this.filteredData = data; // 初始化过滤后的数据为原始数据
        this.isLoading = false;
        loading.dismiss();
      },
      (error) => {
        console.error('Error loading data:', error);
        this.error = 'Failed to load data. Please try again later.';
        this.isLoading = false;
        loading.dismiss();
        this.presentAlert();
      }
    );
  }

// 修改后的过滤方法
 filterItems() {
    const searchTerm = this.searchTerm.trim().toLowerCase();

    // 直接使用匹配项作为过滤数据
    this.filteredData = this.originalData.filter(item =>
      item.item_name?.toLowerCase().includes(searchTerm)
    );

    this.showDetails = this.filteredData.length > 0;
    this.selectedItemDetails = this.formatResults(this.filteredData);
}


// 新增格式化方法
  private formatResults(items: any[]): string {
    return items.map(item =>
      [
        `Item ID: ${item.item_id}`,
        `Name: ${item.item_name || ' '}`,
        `Category: ${item.category}`,
        `Supplier: ${item.supplier_name || ' '}`,
        `Quantity: ${item.quantity}`,
        `Price: $${Number(item.price).toFixed(2)}`, // 修复价格格式化
        `Stock Status: ${item.stock_status}`,
        `Featured: ${item.featured_item === 1 ? 'Yes' : 'No'}`, // 统一为 Yes/No
        `Notes: ${item.special_note || ' '}`,
        '----------------------------'
      ].join('\n')
    ).join('\n\n');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.error,
      buttons: ['OK']
    });

    await alert.present();
  }

  refresh(event: any) {
    this.loadData().then(() => {
      this.searchTerm = ''; // 清空搜索关键词
      this.selectedItemDetails = ''; // 清空详细信息
      event.target.complete();
    });
  }
}
