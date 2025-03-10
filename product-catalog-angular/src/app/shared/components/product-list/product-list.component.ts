import { Component, input } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = input<Product[]>();
}
