import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  constructor(private productService : ProductService) {}

  ngOnInit(): void {}
  searchedName: string;
  @Output('searchEmitter') searchEmitter = new EventEmitter();

  search() {
      this.searchEmitter.emit(this.searchedName);
      this.productService.onNameFilterChanged(this.searchedName);
  }
}
