import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  public products: any[] = [];

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  getProducts(pageSize?: string, pageNumber?: string, search?: string): Observable<any[]> {
    let params = new HttpParams();

    // Adicione os parâmetros à requisição
    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }
    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
