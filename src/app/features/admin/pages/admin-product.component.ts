import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent {
  readonly categories = ['Electronics', 'Accessories', 'Home', 'Office'];

  readonly model: Omit<Product, 'id'> = {
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    category: 'Electronics',
    stock: 0,
    discountPercent: 0,
    releasedAt: new Date().toISOString().split('T')[0],
    rating: 4
  };

  constructor(
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar
  ) {}

  submitForm(): void {
    this.productService
      .addProduct({ id: 0, ...this.model })
      .subscribe(() => this.snackBar.open('Product added in local simulation storage.', 'Dismiss', { duration: 2500 }));
  }
}
