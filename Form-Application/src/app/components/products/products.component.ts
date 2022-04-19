import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  productForm = this.fb.group({
    productName: ["", Validators.required],
    description: ["", Validators.required],
    unitPrice: ["", [Validators.required, Validators.min(1)]],
  });

  isDataUploading = false;
  public products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  get f() {
    return this.productForm.controls;
  }

  //Retreive all product data
  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res.data;
    });
  }

  //Submit the form
  onSubmit() {
    const values = this.productForm.value as Product;
    this.isDataUploading = true;
    this.productService.addProduct(values as Product).subscribe((res) => {
      this.isDataUploading = false;
      this.productForm.reset();
      this.refresh();
    });
    
  }

  onCancel() {
    this.productForm.reset();
  }

  refresh(){
    this.getProducts();
  }
}
