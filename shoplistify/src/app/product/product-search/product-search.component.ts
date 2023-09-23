import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-search',
  template: `
    <input
      type="text"
      placeholder="Pesquisar produtos"
      [(ngModel)]="searchText"
      (keyup)="onSearch()"
    />
  `,
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<string>();
  searchText: string = '';

  onSearch() {
    this.search.emit(this.searchText);
  }
}
