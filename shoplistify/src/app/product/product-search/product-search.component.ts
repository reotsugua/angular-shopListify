import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<string>();
  searchText: string = '';

  onSearch() {
    this.search.emit(this.searchText);
  }
}
