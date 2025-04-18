import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.info = params;
      this.nameData = params['name'];
    })
    this.item = history.state.item;
    console.log(this.item);

    this.form = this.fb.group({
      id: [this.item.id, [Validators.required, Validators.pattern(/^\d+$/)]],
      name: [this.item.name, [Validators.required]],
      category: [this.item.category, [Validators.required]],
      quantity: [this.item.quantity, [Validators.required, Validators.pattern(/^\d+$/)]],
      price: [this.item.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      supplierName: [this.item.supplierName],
      stockStatus: [this.item.stockStatus, [Validators.required]],
      featuredItem: [!!this.item.featuredItem],
      specialNote: [this.item.specialNote || '']
    });
    this.noteToggle = !!this.item.specialNote;
  }

  onNoteToggleChange() {
    let noteControl = this.form.get('specialNote');
    if(!this.noteToggle) {
      this.cachedNote = noteControl?.value || "";
      noteControl?.setValue("");
    } else {
      noteControl?.setValue(this.cachedNote);
    }
  }

}
