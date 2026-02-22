import { Routes } from '@angular/router';
import { ProductDetailComponent } from './shared/components/product-detail/product-detail.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';

export const routes: Routes = [
    {path: "", component: ProductListComponent},
    {path: "detail/:name", component: ProductDetailComponent}
];
