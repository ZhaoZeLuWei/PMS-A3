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
  inputCategory: string = "";
  inputStock: string = "";
  showNote: boolean = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.info = params;
      this.nameData = params['name'];
    })
  }
}
