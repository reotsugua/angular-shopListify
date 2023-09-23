import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: any[] = [];
  productsInCartArray: {productId: string, productQuantity: number}[] = [];
  productsQuantityInCart: number = 0;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // pageSize 10, pageNumber 1 e busca vazia
    this.productService.getProducts('12', '1', '').subscribe((data: any[]) => {
      this.products = this.productService.products = data;
    });

    if (localStorage.getItem("products")) {
      this.productsInCartArray = JSON.parse(localStorage.getItem("products")!);
      this.productsInCartArray.forEach(product => {
        this.productsQuantityInCart += product.productQuantity;
        this.productService.productsTotal$.next(this.productsQuantityInCart); 
      })
    } else {
      this.productService.productsTotal$.next(0);
    }
  }

  public openProductModal(product: any): void {
    let productModalDialog = this.dialog.open(ProductModalComponent, {
      data: product,
      panelClass: 'product-modal',
      height: '80vh',
      width: '80vw'
    });

    productModalDialog.afterClosed().subscribe((result) => {
      if (result.arrowPressed === 'left') {
        this.handleLeftKeyPress(result);
      } else if (result.arrowPressed === 'right') {
        this.handleRightKeyPress(result);
      } else {
        this.updateCart(
          result.quantity,
          result.id,
          result.wasAdded
        );
      }
    });
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

  private updateCart(
    quantity: number,
    productId: string,
    wasAdded: boolean
  ): void {
    if (wasAdded) {
      this.handleAddProductToCart(productId, quantity);
    } else {
      this.handleRemoveProductFromCart(productId, quantity);
    }

    this.manageCartProducts();
  }

  private handleAddProductToCart(productId: string, quantity: number): void {
    if (this.productIsAlreadyOnCart(productId)) {
      this.updateProductQuantityInCart(productId, quantity);
    } else {
      this.addNewProductToCart(productId, quantity);
    }

    this.productsQuantityInCart += quantity;
  }

  private updateProductQuantityInCart(productId: string, quantity: number): void {
    let productIndexInCartArray = this.productsInCartArray.findIndex(product => product.productId === productId);
    this.productsInCartArray[productIndexInCartArray].productQuantity += quantity;
    this.snackBar.open("Quantidade do produto alterada com sucesso!", '', {
      duration: 2000
    });
  }

  private addNewProductToCart(productId: string, quantity: number): void {
    this.productsInCartArray.push({ productId: productId, productQuantity: quantity });
    this.snackBar.open("Produto adicionado ao carrinho com sucesso!", '', {
      duration: 2000
    });
  }

  private handleRemoveProductFromCart(productId: string, quantity: number): void {
    if (this.productIsAlreadyOnCart(productId)) {
      this.removeItemOrDecreaseQuantity(productId, quantity);
    } else {
      this.snackBar.open("Você não tinha nenhuma unidade deste produto em seu carrinho!", '', {
        duration: 2000
      });
    }
  }

  private removeItemOrDecreaseQuantity(productId: string, quantity: number): void {
    let productIndexInCartArray = this.getProductIndexInCartArray(productId);
    let productQuantityInCart = this.getProductQuantityInCart(productIndexInCartArray);

    if ( productQuantityInCart <= quantity) {
      this.removeItemFromCart(productIndexInCartArray);
    } else {
      this.decreaseItemQuantityInCart(productIndexInCartArray, quantity);
    }
  }

  private getProductIndexInCartArray(productId: string): number {
    return this.productsInCartArray.findIndex(product => product.productId === productId);
  }

  private getProductQuantityInCart(productIndexInCartArray: number): number {
    return this.productsInCartArray[productIndexInCartArray].productQuantity;
  }

  private removeItemFromCart(productIndexInCartArray: number): void {
    this.productsInCartArray.splice(productIndexInCartArray, 1);
    this.snackBar.open("Todas as unidades do produto foram removidas do seu carrinho!", '', {
      duration: 2000
    });
    this.productsQuantityInCart -= this.productsInCartArray[productIndexInCartArray].productQuantity;
  }

  private decreaseItemQuantityInCart(productIndexInCartArray: number, quantity: number): void {
    this.productsInCartArray[productIndexInCartArray].productQuantity -= quantity;
    this.productsQuantityInCart -= quantity;
  }

  private productIsAlreadyOnCart(productId: string): { productId: string, productQuantity: number } | undefined {
    return this.productsInCartArray.find(product => product.productId === productId);
  }

  private manageCartProducts(): void {
    localStorage.setItem("products", JSON.stringify(this.productsInCartArray));
    this.productService.productsTotal$.next(this.productsQuantityInCart);
    this.productService.productsInCartArray$.next(this.productsInCartArray);
  }

  handlePageEvent(event: any): void {
    const { pageIndex, pageSize } = event;
    this.getProducts(pageSize, pageIndex);
    console.log(pageIndex);
  }

  getProducts(pageSize: string, pageNumber: string): void {
    // pageSize 10, pageNumber 1 e busca vazia
    if (pageNumber == '0') {
      pageNumber = '1';
    }
    this.productService
      .getProducts(pageSize, pageNumber, '')
      .subscribe((data: any[]) => {
        this.products = data;
        console.log(data);
      });
  }
}
