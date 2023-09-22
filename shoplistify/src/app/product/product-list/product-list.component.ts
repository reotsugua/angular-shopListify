import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // pageSize 10, pageNumber 1 e busca vazia
    this.productService.getProducts('12', '1', '').subscribe((data: any[]) => {
      this.products = this.productService.products = data;
    });
  }

  public openProductModal(product: any): void {
    let productModalDialog = this.dialog.open(ProductModalComponent, {
      data: product,
      panelClass: 'product-modal',
      height: '80vh',
      width: '80vw'
    });

    productModalDialog.afterClosed().subscribe(result => {
      if (result.arrowPressed === "left") {
        this.handleLeftKeyPress(result);
      } else if (result.arrowPressed === "right") {
        this.handleRightKeyPress(result);
      } else {
        this.handleAddProductToCart(result.quantity, result.id, result.wasAdded);
      }
    })
  }

  private handleRightKeyPress(result: any): void {
    let currentProduct = result.productIndex;
    let productIndex = currentProduct + 1;
    let productToOpen = this.products[productIndex];
    this.openProductModal(productToOpen);
  }

  private handleLeftKeyPress(result: any): void {
    let currentProduct = result.productIndex;
    let productIndex = currentProduct - 1;
    let productToOpen = this.products[productIndex];
    this.openProductModal(productToOpen);
  }

  private handleAddProductToCart(quantity: number, productId: string, wasAdded: boolean): void {
    if (wasAdded) {
      //search for productId in cart, add quantity to it
    } else {
      //search for productId in cart, subtract quantity from it
    }
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
