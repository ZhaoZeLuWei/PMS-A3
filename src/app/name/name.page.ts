import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AlertController, LoadingController} from "@ionic/angular";
import {Tab3Service} from "../tab3/tab3.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Item} from "../tab3/tab3Item.model";



@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
  standalone: false,
})
export class NamePage implements OnInit {
  item: any;
  info: any;
  nameData: any;
  cachedNote:string = "";
  noteToggle:boolean = false;
  form!: FormGroup;

  //Injecting all Dependencies
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private ac: AlertController,
  private  Tab3Service:Tab3Service, private lc:LoadingController, private router: Router,
  ) {
  }

//a validator to double check the value of quantity and stock status
  quantityZeroCheck() {
    return (group: FormGroup) => {
      let stockStatus = group.get("stockStatus");
      let quantity = group.get("quantity");
      if (stockStatus && quantity) {
        let stockStatusValue = stockStatus.value;
        console.log(stockStatusValue);
        let quantityValue = quantity.value;
        console.log(quantityValue);
        //check if out of stock with 0 item quantity
        if (stockStatusValue === "Out of stock" && quantityValue !== 0) {
          return {quantityZeroCheck: true};
        }
      }
      return null;
    };
  }

  //init and get the route parameters, set the form
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.info = params;
      this.nameData = params['name'];
    })
    this.item = history.state.item;

    if(!this.item) {
      console.error("Data missing", this.item);
      return;
    }

    //set the form, put all datas in the form
    this.form = this.fb.group({
      id: [this.item.id, [
        Validators.required,
        Validators.max(999999),
        Validators.pattern(/^[1-9]\d*$/)
      ]],
      name: [this.item.name, [
        Validators.required,
        Validators.maxLength(20),
      ]],
      category: [this.item.category, [Validators.required]],
      quantity: [this.item.quantity, [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
        Validators.max(999999),
      ]],
      price: [this.item.price, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]],
      supplierName: [
        this.item.supplierName, [
          Validators.required,
          Validators.maxLength(25),
        ]
      ],
      stockStatus: [this.item.stockStatus, [
        Validators.required,
      ]],
      featuredItem: [!!this.item.featuredItem],
      specialNote: [this.item.specialNote || '']
    }, {validators: this.quantityZeroCheck()},);
    this.noteToggle = !!this.item.specialNote;
    console.log(this.form);
  }

  //set toggle change if there is a special note
  onNoteToggleChange() {
    let noteControl = this.form.get('specialNote');
    if(!this.noteToggle) {
      this.cachedNote = noteControl?.value || "";
      noteControl?.setValue("");
      console.log(noteControl?.value);
    } else {
      noteControl?.setValue(this.cachedNote);
      console.log(noteControl?.value);
    }
  }

  //to create a new Item Object and sent this JSON into the server
  async createItemObject(formValues: any) {
    const newItem: Item = {
      // 直接使用传入的 formValues 对象
      item_id: formValues.id,
      item_name: formValues.name,
      category: formValues.category,
      quantity: formValues.quantity,
      price: formValues.price,
      supplier_name: formValues.supplierName,
      stock_status: formValues.stockStatus,
      featured_item: formValues.featuredItem ? 1 : 0,
      special_note: formValues.specialNote || "",
    };
    return newItem;
  }

  //when click the save, submit all changes into the server
  async submitForm() {
    if (this.form.invalid) {
      //if validations wrong, stop submit
      const alert = await this.ac.create({
        header: 'Validation Error',
        message: 'Please ensure all fields are filled correctly.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    console.log(this.form.value);

    //show user the loading
    let loading = await this.lc.create({
      message: 'Updating...',
      spinner: 'dots',
      duration: 1500,
    });
    await loading.present();

    let newItem = await this.createItemObject(this.form.value);


    //if the server send the success info back
    this.Tab3Service.updateItem(newItem).subscribe({
      next: async (response) => { // next 方法处理成功响应
        console.log("Updated successfully", response);

        const successAlert = await this.ac.create({
          header: 'Success',
          message: 'Item has been successfully updated!',
          buttons: ['OK']
        });
        await successAlert.present();
      },
      error: async (error: HttpErrorResponse) => { // error 方法处理错误
        console.log("Error: Failed to update item", error);

        const errorAlert = await this.ac.create({
          header: 'Error',
          message: 'Failed to update the item. Please try again later.',
          buttons: ['OK']
        });
        await errorAlert.present();
      },
    });
  }


}
