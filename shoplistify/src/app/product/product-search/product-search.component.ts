import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  constructor(private refreshService: RefreshService){}

  ngOnInit() {
    this.refreshService.getClickEvent().subscribe(() => {
      this.clearSearch();
    })
  }

  @Output() search = new EventEmitter<string>();
  searchText: string = '';

  onSearch() {
    this.search.emit(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
  }
}
