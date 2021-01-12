import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss']
})
export class CartProductCardComponent implements OnInit {

  @Input() productId: number = -1;
  @Input() units: number = 0;
  @Output() eventEmitter = new EventEmitter<Product>();
  product: Product;

  constructor(
    private productsService: ProductsService
  ) {
    this.product = {
      id: 0,
      title: 'no-name',
      description: 'no-description',
      price: 0,
      img: 'no-img',
      tags: ['no-tags']
    }
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productsService.getProduct(this.productId).subscribe(response => {
      this.product = response.data as Product;
    });
  }

  showProductDetails() {
    this.eventEmitter.emit(this.product);
  }
}
