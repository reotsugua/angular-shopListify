import { AfterViewInit, Component, HostBinding, OnInit, ViewChild, effect, signal } from '@angular/core';
import { ProductService } from './services/product.service';
import { RefreshService } from './services/refresh.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild("sideBar") sideBar: MatDrawer;
  public totalProductQuantity: number;
  public innerWidth: number;

  constructor(private productService: ProductService, private refreshService: RefreshService) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit(): void {
    this.productService.productsTotal$.subscribe((productsTotal) => {
      this.totalProductQuantity = productsTotal;
    })
  }
  
  ngAfterViewInit(): void {
    this.checkDrawerFixed();
  }

  checkDrawerFixed() {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth > 700) {
      this.sideBar.mode = "side";
      this.sideBar.open();
    }
  }

  title = 'shoplistify';
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  resetPagination() {
    this.refreshService.refreshProductList();
  }
}
