import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from "@ionic/angular";
import {Observable} from "rxjs";

interface Params {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  inputform: FormGroup;
  params: Params;
  inputCategory: string = "";
  inputNote: string | null = "";
  showNote: boolean = false;

  constructor(private router:Router, private actionSheetCtrl: ActionSheetController,
              private fb: FormBuilder, private ac:AlertController) {
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
      return;
    }
  }

  //this is an action sheet for delete, to make a confirmation
  async doActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Deletion confirmation',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Think clicked');
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


}

