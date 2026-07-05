import { Routes } from '@angular/router';
import { ProductDetailComponent } from './shared/components/product-detail/product-detail.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { ProductFormEditComponent } from './shared/components/product-form-edit/product-form-edit.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'detail/:name', component: ProductDetailComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'productform', component: ProductFormComponent },
  { path: 'edit', component: ProductFormEditComponent },
  { path: '**', redirectTo: 'not-found' },
];
