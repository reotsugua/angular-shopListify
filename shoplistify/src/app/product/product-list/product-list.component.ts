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

  ngOnInit(): void {
    this.getProducts('15', '0');
  }
  
  // length:100
  // pageIndex:1
  // pageSize:10
  // previousPageIndex:0

  handlePageEvent(event:any){
    const {pageIndex, pageSize} = event;
    this.getProducts(pageSize, pageIndex);
    console.log(pageIndex)
  }

  getProducts( pageSize:string,  pageNumber:string) {
      // pageSize 10, pageNumber 1 e busca vazia
      if (pageNumber == '0') {
        pageNumber = "1"
      }
      this.productService.getProducts(pageSize, pageNumber , '').subscribe((data: any[]) => {
      this.products = data;
      console.log(data)
    });
  }
}
