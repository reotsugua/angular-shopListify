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
import { MatIconModule } from '@angular/material/icon';
import { ProductRefreshButtonComponent } from './product-refresh-button/product-refresh-button.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductModalComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    ProductRefreshButtonComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    SharedModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    ProductListComponent,
    ProductSearchComponent
  ]
})

export class ProductModule { }
