import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../app/data.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HelpContentService} from "../help-content.service";
import {HelpModalComponent} from "../help-modal/help-modal.component";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  originalData: any[] = [];    // Raw data
  filteredData: any[] = [];    // Filtered data
  searchTerm: string = '';     // Search keywords
  isLoading: boolean = false;  // Search keywords
  error: string = '';          // Error messages
  // New attributes
  showDetails: boolean = true;

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private alertController: AlertController,
  private modalCtrl: ModalController,
  private helpContent: HelpContentService
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
        this.filteredData = data; // Initialize the filtered data as raw data
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


 filterItems() {
    const searchTerm = this.searchTerm.trim().toLowerCase();

    //Initialize the filtered data as raw data
    this.filteredData = this.originalData.filter(item =>
      item.item_name?.toLowerCase().includes(searchTerm)
    );
    this.showDetails = this.filteredData.length > 0;
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
      event.target.complete();
    });
  }
  async showHelp() {
    const helpData = this.helpContent.getHelpContent('search');

    const modal = await this.modalCtrl.create({
      component: HelpModalComponent,
      componentProps: helpData,
      cssClass: 'help-modal'
    });

    await modal.present();
  }

  protected readonly HelpContentService = HelpContentService;
}
