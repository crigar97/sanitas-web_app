import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = true;
  statusMessage: string = "Cargando...";

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  showProducts($event: any) {
    let text: string = $event.target.value;
    if (text === "") {
      this.getProducts();
    } else {
      this.searchByTitle(text);
    }
  }

  getProducts() {
    this.productsService.getProducts().subscribe(response => {
      this.loading = false;
      this.products = response.data as Product[];
    }, error => {
      this.loading = false;
      switch (error.status) {
        case 504:
          this.statusMessage = "Error al cargar la lista de productos."
          break;
      }
      console.log(`Error status: ${error.status}`);
    });
  }

  searchByTitle(text: string) {
    this.productsService.searchByTitle(text).subscribe(response => {
      this.products = response.data as Product[];
    });
  }

}
