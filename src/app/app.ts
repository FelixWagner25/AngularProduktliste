import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ProductListComponent } from "./shared/components/product-list/product-list.component";
import { ProductDetailComponent } from './shared/components/product-detail/product-detail.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ProductListComponent, ProductDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Produktliste');
}
