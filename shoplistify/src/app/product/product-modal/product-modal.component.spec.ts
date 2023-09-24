import { ProductModalComponent } from './product-modal.component';
import { ProductService } from 'src/app/services/product.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModule } from '../product.module';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ProductModule, MatDialogModule],
      declarations: [ProductModalComponent],
      providers: [
        ProductService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        MatSnackBar 
      ]
    });
    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
