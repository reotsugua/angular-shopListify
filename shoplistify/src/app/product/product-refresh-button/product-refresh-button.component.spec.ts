import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductRefreshButtonComponent } from './product-refresh-button.component';
import { MatIconModule } from '@angular/material/icon';  // Adicionando a importação do MatIconModule

describe('ProductRefreshButtonComponent', () => {
  let component: ProductRefreshButtonComponent;
  let fixture: ComponentFixture<ProductRefreshButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],  // Adicionando o MatIconModule aos imports
      declarations: [ProductRefreshButtonComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRefreshButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Adicione outros testes conforme necessário

});
