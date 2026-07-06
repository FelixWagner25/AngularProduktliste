import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ProductModel } from '../../interfaces/models/product.model';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  router = inject(Router);
  productService = inject(ProductService);

  productForm = new FormGroup({
    name: new FormControl('n/a', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('n/a', { nonNullable: true }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  onSubmit() {
    if (this.productForm.valid) {
      let product = new ProductModel(this.productForm.value);

      this.productService.addProduct(product);
      this.router.navigate(['']);
    }
  }
}
