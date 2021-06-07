import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  unsupscriber;
  showedData;
  products;
  flag;
  image;

  ngOnInit(): void {
    this.flag = false;
    this.image = '../../../assets/product.png';
    this.unsupscriber = this.productService.getAll().subscribe(
      (products) => {
        this.products = products;
        this.showedData = products;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.unsupscriber.unsubscribe();
      }
    );
  }

  filteredData;
  assignCopy() {
    this.filteredData = Object.assign([], this.products);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredData = Object.assign([], this.products).filter(
      (item) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  onFiltering(title) {
    console.log(title);
    this.filterItem(title);
    if (title === '') {
      this.showedData = this.products;
    } else {
      this.showedData = this.filteredData;
    }
    console.log(this.filteredData);
    if (this.showedData.length == 0) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  newProduct = new FormData();

  newProductForm = new FormGroup({
    title: new FormControl(),
    details: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
  });

  onImageSelected(input) {
    if (input.files && input.files[0]) {
      console.log(input.files[0]);
      this.newProduct.append('image', input.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (_event) => {
        this.image = reader.result;
        console.log(this.image);
      };
    }
  }

  onAddNewProduct() {
    this.newProduct.append('category', this.newProductForm.value['category']);
    this.newProduct.append('price', this.newProductForm.value['price']);
    this.newProduct.append('details', this.newProductForm.value['details']);
    this.newProduct.append('title', this.newProductForm.value['title']);

    document.getElementById("closeModalButton").click();
    this.unsupscriber = this.productService.add(this.newProduct).subscribe(
      (res) => {
        console.log(res);
        this.showedData.push(res);
        this._snackBar.open('Product added successfully.', '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['snackBar'],
        });
      },
      (err) => {
        console.log(err);
        this._snackBar.open(
          'Something goes wrong, product was not added.',
          '',
          {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['snackBar'],

          }
        );
      },
      () => {
        this.unsupscriber.unsubscribe();
      }
    );
    this.newProductForm.reset();
    this.image = '../../../assets/product.png';
  }
}
