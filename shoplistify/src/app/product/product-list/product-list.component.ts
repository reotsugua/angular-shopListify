import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  productsFull: any[] = [];
  productsInCartArray: {productId: string, productQuantity: number}[] = [];
  productsQuantityInCart: number = 0;
  pageSize = '12';
  pageNumber = '1';
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    // // pageSize 10, pageNumber 1 e busca vazia
    // this.productService.getProducts('12', '1', '').subscribe((data: any[]) => {
    //   this.products = this.productService.products = data;
    // });

    if (localStorage.getItem("products")) {
      this.productsInCartArray = JSON.parse(localStorage.getItem("products")!);
      this.productsInCartArray.forEach(product => {
        this.productsQuantityInCart += product.productQuantity;
        this.productService.productsTotal$.next(this.productsQuantityInCart);
      })
    } else {
      this.productService.productsTotal$.next(0);
    }

    this.loadProducts();

    this.refreshService.getClickEvent().subscribe(() => {
      this.resetPagination();
    })
  }

  loadProducts() {
    this.productService
      .getProducts(this.pageSize, this.pageNumber, this.searchText)
      .subscribe((data: any[]) => {
        this.products = this.productService.products = data;
        this.productsFull = data;
      });
  }

  handlePageEvent(event: any) {
    const { pageIndex, pageSize } = event;
    this.pageNumber = (pageIndex + 1).toString();
    this.pageSize = pageSize.toString();
    this.loadProducts();
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
    this.loadProducts();
  }

  public openProductModal(product: any): void {
    let productModalDialog = this.dialog.open(ProductModalComponent, {
      data: product,
      panelClass: 'product-modal',
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

  resetPagination(): void {
    this.pageSize = '12'; // Defina o pageSize inicial
    this.pageNumber = '1'; // Defina o pageNumber inicial
    this.searchText = ''; // Limpe o texto de busca
    this.loadProducts(); // Carregue os produtos com os novos parâmetros
  }

  handleCategoryFilterSideBar(categorys:string[]) {
    if (categorys.length > 0 ) {
      this.products = [...this.productsFull.filter((product)=>{
        return categorys.includes(product.category.toLowerCase())
      })];
    } else {
      this.products = this.productsFull;
    }
  }
  handlePriceFilterSideBar(prices:any[]) {
    const convertValueToFloat = (value:any) => parseFloat(value.replace(/[^0-9.-]/g, ''));

    if (prices.length === 0) {
      this.products = [...this.productsFull]
    }

    // Até R$ 50,00
    if (prices.includes('range1')) {
      this.products = [...this.productsFull.filter((product)=>{
        const valuePrice = convertValueToFloat(product.price);
        return valuePrice <= 50
      })];
    }
    // R$ 50,00 a R$ 100,00
    if (prices.includes('range2')) {
      this.products = [...this.productsFull.filter((product)=>{
        const valuePrice = convertValueToFloat(product.price);
        return valuePrice >= 50 && valuePrice <=100
      })];
    }

    // R$ 100,00 a R$ 200,00
    if (prices.includes('range3')) {
      this.products = [...this.productsFull.filter((product)=>{
        const valuePrice = convertValueToFloat(product.price);
        return valuePrice >= 100 && valuePrice <= 200
      })];
    }

    // Acima de R$ 200,00
    if (prices.includes('range4')) {
      this.products = [...this.productsFull.filter((product)=>{
        const valuePrice = convertValueToFloat(product.price);
        return valuePrice > 200
      })];
    }
  }

}
