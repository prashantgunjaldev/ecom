import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { Product } from '../interfaces.def';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  host: string = environment.host;

  productList : Product[]= [];

  constructor( private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((data)=>{
      this.productList = data;
    });
  }

  getDiscountedPrice(p: Product){
    return p.price - (p.price * p.discount / 100);
  }

}
