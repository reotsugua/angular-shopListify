import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  category = this._formBuilder.group({
    tools: false,
    automotive: false,
    sports: false,
    music: false,
    toys: false,
  });

  price = this._formBuilder.group({
    range1: false,
    range2: false,
    range3: false,
    range4: false,
  });

  constructor(private _formBuilder: FormBuilder) {}

}
