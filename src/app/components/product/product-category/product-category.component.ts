import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  categoryFilter;
  nameFilter;
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {

  }

  onEmitt(value){
    this.categoryFilter = value;
  }

  onTitleEmit(title){
    this.productService.onNameFilterChanged(title);
  }
}
