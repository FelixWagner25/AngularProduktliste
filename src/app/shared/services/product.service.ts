import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { ProductModel } from '../interfaces/models/product.model';
// Create a single supabase client for interacting with your database

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  supabase = createClient(
    'https://qpvubpagfkjnaaddknqw.supabase.co',
    'sb_publishable_5QMGVm710qAEeNoXeVqmTg_g7qKCXlS',
  );

  productListInsertChannel;
  productListDeleteChannel;

  private productList = signal<Product[]>([]);

  router = inject(Router);

  productdetail = signal<Product>({
    id: 0,
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
  });

  constructor() {
    this.getAllProducts();
    this.productListInsertChannel = this.supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products2' },
        (payload) => {
          let tmpProduct = new ProductModel(payload.new);
          this.productList.update((list) => [...list, tmpProduct]);
          console.log('Change received!', payload.new);
        },
      )
      .subscribe();

    this.productListDeleteChannel = this.supabase
      .channel('custom-delete-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'products2' },
        (payload) => {
          console.log(payload);
          let tmpProduct = new ProductModel(payload.old);
          this.productList.update((list) => list.filter((product) => product.id != tmpProduct.id));
        },
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.productListInsertChannel);
    this.supabase.removeChannel(this.productListDeleteChannel);
  }

  getAllData() {
    return this.productList;
  }

  setProductDetailByName(name: string) {
    let tmpProduct = this.productList().filter((product) => product.name === name)[0];
    if (tmpProduct) this.productdetail.set(tmpProduct);
  }

  setProductDetailById(id: number) {
    let tmpProduct = this.productList().filter((product) => product.id === id)[0];
    if (tmpProduct) this.productdetail.set(tmpProduct);
  }

  async addProduct(product: ProductModel) {
    const product_data = product.getCleanAddJson();
    const { data, error } = await this.supabase.from('products2').insert([product_data]).select();
  }

  async deleteProduct(id: number) {
    const { error } = await this.supabase.from('products2').delete().eq('id', id);

    this.router.navigate(['']);
  }

  editProduct(name: string) {
    this.setProductDetailByName(name);
    this.router.navigate(['edit']);
  }

  updateProduct(product: ProductModel) {
    this.productList.update((list) => list.map((p) => (p.name === product.name ? product : p)));
  }

  async getAllProducts() {
    let response = await this.supabase.from('products2').select('*');
    this.productList.set((response.data ?? []) as Product[]);
  }
}
