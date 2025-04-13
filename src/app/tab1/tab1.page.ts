import { Component, OnInit } from '@angular/core';
import { ApiService } from '../data.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  originalData: any[] = []; // 存储原始数据
  filteredData: any[] = []; // 存储过滤后的数据
  searchTerm: string = ''; // 搜索关键词
  isLoading: boolean = false; // 加载状态
  error: string = ''; // 错误信息
  selectedItemDetails: string = ''; // 选中商品的详细信息
  showDetails: boolean = false; // 是否显示详细信息

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadData(); // 初始化加载数据
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Loading items...', // 加载提示信息
      translucent: true,
    });
    await loading.present();

    this.apiService.getAllItems().subscribe(
      (data: any[]) => {
        this.originalData = data.sort((a, b) => b.item_id - a.item_id); // 按 item_id 降序排序
        this.filteredData = [...this.originalData]; // 初始化过滤数据为原始数据
        this.selectedItemDetails = this.formatResults(this.originalData, ''); // 初始化显示所有数据
        this.isLoading = false;
        loading.dismiss();
      },
      (error) => {
        console.error('Error loading data:', error); // 输出错误信息
        this.error = 'Failed to load data. Please try again later.'; // 设置错误提示信息
        this.isLoading = false;
        loading.dismiss();
        this.presentAlert(); // 显示错误提示框
      }
    );
    this.isLoading = true;
  }

  filterItems() {
    const searchTerm = this.searchTerm.trim().toLowerCase(); // 获取并处理搜索关键词
    // 始终显示所有数据，但标记匹配项
    this.selectedItemDetails = this.formatResults(this.originalData, searchTerm);
    this.showDetails = this.originalData.length > 0; // 如果有数据则显示详细信息
  }

  private formatResults(items: any[], searchTerm: string): string {
    return items.map(item => {
      const isMatch = this.isItemMatchingSearch(item, searchTerm); // 判断商品是否匹配搜索关键词
      const matchIndicator = isMatch ? '✅ ' : ''; // 添加匹配标记
      return [
        `${matchIndicator}Item ID: ${item.item_id}`, // 商品ID
        `Name: ${item.item_name}`, // 商品名称
        `Category: ${item.category} (${item.category === 'Electronics' ? '✅' : ''})`, // 商品类别
        `Supplier: ${item.supplier_name}`, // 供应商名称
        `Quantity: ${item.quantity}`, // 数量
        `Price: $${item.price}`, // 价格
        `Stock Status: ${this.getStockStatusIcon(item.stock_status)}`, // 库存状态
        `Featured: ${item.featured_item === 1 ? '🌟 Yes' : 'No'}`, // 是否推荐
        `Notes: ${String(item.special_note) || 'N/A'}`, // 备注
        '----------------------------------'
      ].join('\n');
    }).join('\n\n');
  }

  private isItemMatchingSearch(item: any, searchTerm: string): boolean {
    if (!searchTerm) return false; // 如果搜索关键词为空，返回false
    const itemName = item.item_name?.toLowerCase() || ''; // 获取并处理商品名称
    const supplierName = item.supplier_name?.toLowerCase() || ''; // 获取并处理供应商名称
    return itemName.includes(searchTerm) || supplierName.includes(searchTerm); // 判断是否匹配
  }

  private getStockStatusIcon(status: string): string {
    switch(status) {
      case 'In Stock': return '🟢 In Stock'; // 在库
      case 'Low Stock': return '🟡 Low Stock'; // 库存低
      case 'Out of Stock': return '🔴 Out of Stock'; // 缺货
      default: return status; // 其他状态
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error', // 提示框标题
      message: this.error, // 提示框内容
      buttons: ['OK'] // 提示框按钮
    });
    await alert.present(); // 显示提示框
  }

  refresh(event: any) {
    this.loadData().then(() => {
      this.searchTerm = ''; // 清空搜索关键词
      this.selectedItemDetails = this.formatResults(this.originalData, ''); // 重新显示所有数据
      event.target.complete(); // 完成刷新
    });
  }

  protected readonly String = String; // String 类型保护
}