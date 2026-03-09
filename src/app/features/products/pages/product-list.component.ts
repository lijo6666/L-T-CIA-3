import { AsyncPipe, CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductStatusDirective } from '../../../shared/directives/product-status.directive';
import { ProductFilterPipe } from '../../../shared/pipes/product-filter.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    FormsModule,
    RouterLink,
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ProductFilterPipe,
    ProductStatusDirective
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  readonly products$ = this.productService.getProducts();
  readonly categories$ = this.productService.getCategories().pipe(
    map((categories) => {
      const categoryNames = categories.map((category) => category.name);
      this.categories = ['All', ...categoryNames];
      return this.categories;
    })
  );

  searchTerm = '';
  selectedCategory = 'All';
  categories: string[] = ['All'];

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar
  ) {}

  addToCart(product: Product): void {
    if (product.stock === 0) {
      this.snackBar.open('Product is out of stock.', 'Dismiss', { duration: 2500 });
      return;
    }

    this.cartService.addToCart(product, 1);
    this.snackBar.open(`${product.name} added to cart.`, 'Dismiss', { duration: 2500 });
  }
}
