import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  selectedProduct: Product;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
  }

  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.products$ = this.productService.products$;

    this.productsNumber$ = this
                              .products$
                              .pipe(
                                map(products => products.length),
                                startWith(0)
                              );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     data => this.products = data
    //   )
  }

}
