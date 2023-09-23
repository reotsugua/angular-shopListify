import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRefreshButtonComponent } from './product-refresh-button.component';

describe('ProductRefreshButtonComponent', () => {
  let component: ProductRefreshButtonComponent;
  let fixture: ComponentFixture<ProductRefreshButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRefreshButtonComponent]
    });
    fixture = TestBed.createComponent(ProductRefreshButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
