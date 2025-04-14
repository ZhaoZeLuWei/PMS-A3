import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {Router, RouterModule} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from "@ionic/angular";
import {Tab3Service} from "./tab3.service";
import {Item} from "./tab3Item.model";
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";

interface Params {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tab3',
  standalone: true,
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [FormsModule, IonicModule, ReactiveFormsModule, RouterModule, CommonModule],
})

export class Tab3Page implements OnInit {
  items: FormGroup[] = [];
  resultItems: FormGroup[] = [];
  inputform: FormGroup;
  params: Params;
  searchSuccess: boolean = false;
  deleteSuccess: boolean = true;

  constructor(private router:Router, private actionSheetCtrl: ActionSheetController,
              private fb: FormBuilder, private ac:AlertController, private http:HttpClient,
              private t3Service: Tab3Service) {
    this.params = {id:1,name:"Bob"};
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
      this.searchSuccess = false;
      return;
    }
    if (this.inputform.get('itemName')?.value) {
      this.searchSuccess = true;
    }
  }

  //this is an action sheet for delete, to make a confirmation
  async deleteActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Deletion confirmation',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Think clicked');
            this.deleteSuccess = false;
            console.log(this.deleteSuccess)
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
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
        this.resultItems = this.items;
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
        if(this.resultItems.length > 0)  {
          this.searchSuccess = true;
          console.log(this.resultItems);
        }
      }else {
        this.resultItems = this.items;
        this.searchSuccess = false;
      }
  }
}

