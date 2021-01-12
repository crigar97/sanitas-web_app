import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductApiResponse } from 'src/app/models/api-responses/product-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>('/api/products');
  }

  getProduct(id: number): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(`/api/products/${id}`);
  }

  searchByTitle(text: string): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(`/api/products/search/${text}`);
  }

}
