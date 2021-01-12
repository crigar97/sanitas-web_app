import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  loading: boolean = true;
  error: boolean = false;
  statusMessage: string = "Cargando...";

  constructor(
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      if (params['id'] > 0) {
        let productId = params['id'];
        this.getProduct(productId);
      }
    });
  }

  getProduct(id: number) {
    this.productsService.getProduct(id).subscribe(response => {
      this.loading = false;
      this.product = response.data as Product;
    }, error => {
      this.loading = false;
      this.error = true;
      switch (error.status) {
        case 504:
          this.statusMessage = "Error al cargar la información de este producto."
          break;
        case 404:
          this.statusMessage = "Lo sentimos, este producto no está disponible."
          break;
      }
      console.log(`Error status: ${error.status}`);
    });
  }

}
