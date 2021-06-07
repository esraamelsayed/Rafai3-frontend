import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})

export class ProductHeaderComponent implements OnInit {




  @Input() filterOfHeader: String;
  headerImage: String;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
   this.headerImage = `../../../assets/${this.filterOfHeader}.jpg`;
   console.log(this.headerImage);
  }

}
