import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})

export class CategoryMenuComponent implements OnInit {
  constructor(private productService: ProductService) { }

  @Output() filterEmitt : EventEmitter<String> = new EventEmitter()

  ngOnInit(): void {
    this.onClickMenu('kitchen');
  }

  onClickMenu(filter){
    this.filterEmitt.emit(filter);
  }

  onFiltering(title){
    //this.productService.nameFilter = title;
  }
}
