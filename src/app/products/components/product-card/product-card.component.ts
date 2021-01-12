import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor() {
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
  }

}
