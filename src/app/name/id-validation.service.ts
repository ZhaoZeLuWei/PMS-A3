import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../tab3/tab3Item.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class Tab3Service {
  private scuURL = 'https://prog2005.it.scu.edu.au/ArtGalley/';

  constructor(private http: HttpClient) { }



}
