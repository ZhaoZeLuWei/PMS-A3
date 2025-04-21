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

//Parms to
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
  showHelp: boolean = false;
  items: FormGroup[] = [];
  resultItems: FormGroup[] = [];
  inputform: FormGroup;
  //Checkout user is doing input to search
  searchTrigger: boolean = false;

  ts: ToastController = new ToastController;
  //check internet connections (runtime 10s)
  isLoading: boolean = false;
  loadFailed: boolean = false;
  loadTimeout:any;

  //Dependency Injection
  constructor(
              private fb: FormBuilder, private ac:AlertController, private http:HttpClient,
              private t3Service: Tab3Service, private router: Router) {
    this.inputform = fb.group({
      itemName: ['', Validators.required],
    });
  }

  //Click the search button and see all results
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
    this.isLoading = true;
    this.loadFailed = false;

    this.loadTimeout = setTimeout(() => {
      if (this.isLoading) {
        this.loadFailed = true;
      }
    }, 10000);

    this.t3Service.getItems().subscribe({
      next: (scuData: Item[]) => {
        //if can't get data ,then failed loading
        clearTimeout(this.loadTimeout);
        this.isLoading = false;
        //Turn get data into items
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
        clearTimeout(this.loadTimeout);
        this.isLoading = false;
        this.loadFailed = true;
        console.error("Error to init the items form group.", err);
      }
    })
  }

  //if the user input ,then do the search from the items list, and put all related results into result list
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

  //the delete function.Once clicked, deleted that item both from the app and the server
  handleDelete(item: any) {
    let name = item.name;
    let id = item.id;

    if(!name){
      console.log("Error with name");
      return;
    }
    // Delete from the app
    this.resultItems = this.resultItems.filter(fg => fg.get('id')?.value !== id);
    this.items = this.items.filter(fg => fg.get('id')?.value !== id);

    this.onSearch();

    // Delete from the server
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
