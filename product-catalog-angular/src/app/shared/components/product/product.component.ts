import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: false
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(
    private router: Router
  ) {

  }
}