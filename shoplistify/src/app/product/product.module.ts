import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductModalComponent } from './product-modal/product-modal.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent  
  ]
})
export class ProductModule { }
