import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public totalProductQuantity: number;

  constructor(private productService: ProductService) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit(): void {
    this.productService.productsTotal$.subscribe((productsTotal) => {
      this.totalProductQuantity = productsTotal;
    })
  }

  title = 'shoplistify';
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
}
