import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  detail =  {
 "name": "Gaming Maus",
 "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
 "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
 "stock": 120,
 "price": 2500000
 }

 deleteDetail(){
  this.detail.name = ""
 }
}
