import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RefreshService } from 'src/app/services/refresh.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Output() handleCategoryFilter = new EventEmitter();
  @Output() handlePriceFilter = new EventEmitter();

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

  constructor(private _formBuilder: FormBuilder, private refreshService: RefreshService) {}

  ngOnInit(): void {
    this.handleCategoryForm();

    this.handlePriceForm();

    this.refreshService.getClickEvent().subscribe(() => {
      this.uncheckAllCheckboxes();
    })
  }

  handleCategoryForm() {
    let filterSelected:string[] = [];
    this.category.valueChanges.subscribe((categorys:any)=> {
      const keys = Object.keys(categorys)
      filterSelected = [...keys.filter((key) => !!categorys[key])];
      this.handleCategoryFilter.emit(filterSelected)
    });
  }

  handlePriceForm() {
    let filterSelected:string[] = [];
    this.price.valueChanges.subscribe((items:any)=> {
      const keys = Object.keys(items)
      filterSelected = [...keys.filter((key) => !!items[key])];
      this.handlePriceFilter.emit(filterSelected)
    });
  }

  uncheckAllCheckboxes() {
    const priceControls = this.price.controls;
    const categoryControls = this.category.controls;

    for (const controlName in categoryControls) {
      if (categoryControls.hasOwnProperty(controlName)) {
        this.category.get(controlName)?.setValue(false);
      }
    }

    for (const controlName in priceControls) {
      if (priceControls.hasOwnProperty(controlName)) {
        this.price.get(controlName)?.setValue(false);
      }
    }
  }

}
