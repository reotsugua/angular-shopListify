import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './components/star/star.component';
import { CartComponent } from './components/cart/cart.component';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';



@NgModule({
  declarations: [
    StarComponent,
    CartComponent,
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    CurrencyFormatPipe
  ]
})
export class SharedModule { }
