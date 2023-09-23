import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModule } from '../product.module';
import { ProductSearchComponent } from './product-search.component';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductModule],
      declarations: [ProductSearchComponent]
    });
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event on search', () => {
    const searchText = 'example search';
    spyOn(component.search, 'emit');
  
    component.searchText = searchText;
    component.onSearch();
  
    expect(component.search.emit).toHaveBeenCalledWith(searchText);
  });

  it('should clear search text', () => {
    component.searchText = 'example search';
    component.clearSearch();
    expect(component.searchText).toBe('');
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    expect(component.searchText).toBe('');
  });
  
  
  
});
