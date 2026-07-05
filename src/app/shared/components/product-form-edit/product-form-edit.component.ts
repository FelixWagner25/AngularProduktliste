import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form-edit.component.html',
  styleUrl: './product-form-edit.component.scss',
})
export class ProductFormEditComponent {
  router = inject(Router);
  productService = inject(ProductService);
  product = this.productService.productdetail;

  productForm = new FormGroup({
    name: new FormControl(this.product().name, {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl(this.product().description),
    stock: new FormControl(this.product().stock, {
      validators: [Validators.required, Validators.min(0)],
    }),
    price: new FormControl(this.product().price, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  onSubmit() {
    if (this.productForm.valid) {
      let product: Product = {
        name: this.productForm.value.name ? this.productForm.value.name : 'n/a',
        description: this.productForm.value.description
          ? this.productForm.value.description
          : 'n/a',
        specs: '',
        stock: this.productForm.value.stock ? this.productForm.value.stock : 0,
        price: this.productForm.value.price ? this.productForm.value.price : 0,
      };
      this.productService.updateProduct(product);
      this.router.navigate(['']);
    }
  }
}
