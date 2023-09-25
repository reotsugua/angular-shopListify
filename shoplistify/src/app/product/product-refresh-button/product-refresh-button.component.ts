import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-refresh-button',
  templateUrl: './product-refresh-button.component.html',
  styleUrls: ['./product-refresh-button.component.scss'],
})

export class ProductRefreshButtonComponent {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  onRefresh(): void {
    this.refresh.emit();
  }
}
