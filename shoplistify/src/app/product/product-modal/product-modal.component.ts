import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})

export class ProductModalComponent implements OnInit {
  public quantity: number;
  public products: any[] = [];
  public currentProductIndex: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formsModule: FormsModule, private productService: ProductService, public productModalRef: MatDialogRef<ProductModalComponent>,
    private snackBar: MatSnackBar)  {}

  ngOnInit(): void {
    // fazer um get da quantidade do produto no carrinho
    this.products = this.productService.products;
    this.currentProductIndex = this.products.findIndex(product => product.name === this.data.name);
  }
  
  public changeProductQuantityInCart(id: string, wasAdded: boolean): void {
    let quantity = this.quantity;
    this.productModalRef.close({quantity, id, wasAdded});
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.handleLeftArrowKeyPress();
    } else if (event.key === 'ArrowRight') {
      this.handleRightArrowKeyPress();
    }
  }

  private handleRightArrowKeyPress(): void {
    if (this.isLastProduct()) {
      this.snackBar.open("Você chegou ao fim da página!", '', {
        duration: 2000
      });
    } else {
      this.sendPressedKeyToParent('right');
    }
  }

  private isLastProduct(): boolean {
    return (this.currentProductIndex + 1) === this.products.length;
  }

  private handleLeftArrowKeyPress(): void {
    if (this.isFirstProduct()) {
      this.snackBar.open("Você chegou ao primeiro produto da página!", '', {
        duration: 2000
      });
    } else {
      this.sendPressedKeyToParent('left');
    }
  }

  private isFirstProduct(): boolean {
    return (this.currentProductIndex - 1) < 0;
  }

  private sendPressedKeyToParent(arrowPressed: string): void {
    let productIndex = this.currentProductIndex;
    this.productModalRef.close({arrowPressed, productIndex});
  }
}