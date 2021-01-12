import { Component, OnInit } from '@angular/core';

import { CartProduct } from 'src/app/models/cart-product.model';
import { Product } from 'src/app/models/product.model';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  loading: boolean = true;
  cartProducts: CartProduct[] = [];
  productToShow: Product;
  totalUnits: number = 0;
  bill: number = 0;
  message: string = "Cargando..."

  constructor(
    private cartProductsService: CartProductsService,
    private productsService: ProductsService
  ) {
    this.productToShow = {
      id: 0,
      title: 'no-name',
      description: 'no-description',
      price: 0,
      img: 'no-img',
      tags: ['no-tags']
    }
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartProductsService.getCardProducts().subscribe(response => {
      this.loading = false;
      const data = response.data;
      if (data.length > 0) {
        this.cartProducts = data as CartProduct[];
        const productId: number = this.cartProducts[0].productId;
        this.getProductToShow(productId);
        this.calculateBill();
      } else {
        this.message = "El carrito está vacio."
      }
    }, error => {
      switch(error.status) {
        case 504:
          this.message = "Error al listar los productos."
          break;
      }
    });
  }

  calculateBill() {
    this.bill = 18;
  }

  getProductToShow(id: number) {
    this.productsService.getProduct(id).subscribe(response => {
      this.productToShow = response.data as Product;
    });
  }

  showProductDetails(product: Product) {
    this.productToShow = product;
  }
}
