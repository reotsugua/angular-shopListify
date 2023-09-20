import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   this.productService.getProducts()
  //     .subscribe((data: any[]) => {
  //       this.products = data;
  //       console.log('Products:', this.products);
  //     });
  // }

  ngOnInit(): void {
    // pageSize 10, pageNumber 1 e busca vazia
    this.productService.getProducts('20', '1', '').subscribe((data: any[]) => {
      this.products = data;
      console.log(data)
    });
  }


}
