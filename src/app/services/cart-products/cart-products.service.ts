import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProductsApiResponse } from 'src/app/models/api-responses/cart-products-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getCardProducts(): Observable<CartProductsApiResponse> {
    return this.http.get<CartProductsApiResponse>('/api/cart');
  }

  getTotalUnits(): Observable<number> {
    return this.http.get<number>('/api/cart/count');
  }
}
