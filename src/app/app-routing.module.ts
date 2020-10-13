import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductlistComponent } from './productlist/productlist.component';
import {ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'Product', pathMatch: 'full'},
  { path: 'Product', component: ProductlistComponent },
  { path: 'Product-detail/:id', component: ProductDetailComponent },
  {path        : '**',  pathMatch   : 'full',component:ProductlistComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
