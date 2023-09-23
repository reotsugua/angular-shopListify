import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductModalComponent,
    ProductDetailComponent,
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    SharedModule,
    MatInputModule
  ],
  exports: [
    ProductListComponent,
    ProductSearchComponent
  ]
})

export class ProductModule { }
