import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  productService = inject(ProductService);
  detail = this.productService.productdetail;

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) this.productService.setProductDetailByName(currentName);
  }
}
