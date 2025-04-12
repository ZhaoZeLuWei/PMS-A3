import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ActionSheetController} from "@ionic/angular";

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

  params: Params;
  constructor(private router:Router, private actionSheetCtrl: ActionSheetController) {
    this.params = {id:1,name:"Bob"};
  }

  async doActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Select an option',
      buttons: [
        {
          text: 'Think',
          role: 'destructive',
          handler: () => {
            console.log('Think clicked');
          }
        },{
          text: 'Eat',
          handler: () => {
            console.log('Eat clicked');
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

