import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
  standalone: false,
})
export class NamePage implements OnInit {
  info: any;
  nameData: any;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.info = params;
      this.nameData = params['name'];
    })
    console.log("OnInit");
  }
  ngOnDestroy() {
    console.log("On Destroy");
  }

  ionViewDidLoad() {
    console.log("View did load");
  }

  ionViewWillEnter() {
    console.log("View will enter");
  }
}
