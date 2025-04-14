import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionSheetController, IonicModule} from "@ionic/angular";
import {Params, RouterLink} from "@angular/router";
import {Tab3Service} from "../tab3/tab3.service";

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true,
})
export class ManageItemComponent  implements OnInit {
  deleteSuccess: boolean = true;
  //receive items one by one
  @Input() item: any;
  // delete feedback to tab3
  @Output() itemDelete = new EventEmitter<number>();
  params !: Params;

  constructor( private actionSheetCtrl: ActionSheetController, private t3s: Tab3Service) {
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
            this.itemDelete.emit(this.item);
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
    this.params = {id: this.item.id, name: this.item.name};
  }

}
