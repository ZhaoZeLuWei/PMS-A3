import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from "@ionic/angular";
import {Tab3Service} from "./tab3.service";
import {Item} from "./tab3Item.model";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ManageItemComponent} from "../manage-item/manage-item.component";
import {ToastController} from "@ionic/angular";

interface Params {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tab3',
  standalone: true,
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [FormsModule, IonicModule, ReactiveFormsModule, RouterModule, CommonModule, ManageItemComponent],
})

export class Tab3Page implements OnInit {
  items: FormGroup[] = [];
  resultItems: FormGroup[] = [];
  inputform: FormGroup;
  //Checkout user is doing input to search
  searchTrigger: boolean = false;
  ts: ToastController = new ToastController;

  constructor(
              private fb: FormBuilder, private ac:AlertController, private http:HttpClient,
              private t3Service: Tab3Service, private router: Router) {
    this.inputform = fb.group({
      itemName: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.inputform.invalid) {
      this.ac.create({
        header:"Error",
        message:"Please enter a valid name",
        buttons: ["OK"],
      }).then( alert => alert.present());
      return;
    }
    this.searchTrigger = true;
    this.onSearch();
  }

  ngOnInit() {
    this.t3Service.getItems().subscribe({
      next: (scuData: Item[]) => {
        this.items = scuData.map(
          item => this.fb.group({
            id: [item.item_id],
            name: [item.item_name],
            category: [item.category],
            quantity: [item.quantity],
            price: [item.price],
            supplierName: [item.supplier_name],
            stockStatus: [item.stock_status],
            featuredItem: [item.featured_item],
            specialNote : [item.special_note || ""],
          })
        );
        console.log(this.items);
        this.inputform.get('itemName')?.valueChanges.subscribe(() => {
          this.searchTrigger = false;
          this.onSearch();
        });
      },
      error: (err: any) => {
        console.error("Error to init the items form group.", err);
      }
    })
  }

  onSearch() {
      let searchItemName = this.inputform.get('itemName')?.value.toLowerCase();
      if (searchItemName) {
        this.resultItems = this.items.filter(item => {
          return item.get('name')?.value.toLowerCase().includes(searchItemName);
        });
        console.log(this.resultItems);
        if(this.resultItems.length > 0) {
          let resultData = this.resultItems.map(item => item.get('id')?.value);
        }
      }else {
        this.resultItems = [];
      }
  }

  handleDelete(item: any) {
    let name = item.name;
    let id = item.id;

    if(!name){
      console.log("Error with name");
      return;
    }

    // 前端同步删除
    this.resultItems = this.resultItems.filter(fg => fg.get('id')?.value !== id);
    this.items = this.items.filter(fg => fg.get('id')?.value !== id);

    this.onSearch(); // 更新视图

    // 删除请求
    this.t3Service.deleteItem(name).subscribe({
      next: () => {
        console.log(`Item "${name}" deleted on server`);
      },
      error: err => {
        console.error(`Failed to delete item "${name}" on server`, err);
      }
    });

    //show user the delete info
    this.ts.create({
      message: `Item deleted successfully.`,
      duration: 2000,
      color: 'success'
    }).then(toast => toast.present());
  }

}

