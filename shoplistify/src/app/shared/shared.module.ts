import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './components/star/star.component';
import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [
    StarComponent,
    CartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent
  ]
})
export class SharedModule { }
