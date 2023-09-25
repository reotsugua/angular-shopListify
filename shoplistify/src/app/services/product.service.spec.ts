import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products with specified parameters', fakeAsync(() => {
    const pageSize = '10';
    const pageNumber = '1';
    const search = 'example';
    const expectedProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    service.getProducts(pageSize, pageNumber, search).subscribe(products => {
      expect(products).toEqual(expectedProducts);
    });

    const req = httpTestingController.expectOne(request => {
      return request.url === 'http://localhost:3000/products' &&
        request.params.get('pageSize') === pageSize &&
        request.params.get('pageNumber') === pageNumber &&
        request.params.get('search') === search;
    });

    expect(req.request.method).toBe('GET');
    req.flush(expectedProducts);
    tick();
  }));

  it('should emit productsInCartArray$ correctly', () => {
    const productsInCart = [{ productId: '1', productQuantity: 2 }];
  
    service.productsInCartArray$.next(productsInCart);
    service.productsInCartArray$.subscribe(products => {
      expect(products).toEqual(productsInCart);
    });
  });
  
  it('should emit productsTotal$ correctly', () => {
    const total = 100;
  
    service.productsTotal$.next(total);
    service.productsTotal$.subscribe(emittedTotal => {
      expect(emittedTotal).toEqual(total);
    });
  });
});
