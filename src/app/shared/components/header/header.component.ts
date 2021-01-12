import { Component, OnInit } from '@angular/core';
import { CartProductsService } from 'src/app/services/cart-products/cart-products.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  totalUnits: number = 0;

  constructor(
    private cartProductsService: CartProductsService
  ) { }

  ngOnInit(): void {
    this.getTotalUnits();
  }

  getTotalUnits() {
    this.cartProductsService.getTotalUnits().subscribe(total => {
      this.totalUnits = total;
      console.log(this.totalUnits);
    });
  }

}
