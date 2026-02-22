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
  detail = {
    "name": "Gaming Maus",
    "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
    "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
    "stock": 120,
    "price": 2500000
    };

  ngOnInit(){
    let currentName = this.route.snapshot.paramMap.get('name')
    if (currentName) this.detail = this.productService.getDataByName(currentName);
  }

 deleteDetail(){
 }
}
