import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart.service';
import { CartItem, Product } from '../interfaces.def';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  host: string = environment.host;

  list : CartItem[] = [];

  searchText: string = '';

  recordsToShow : Product[] = [];

  constructor(private cart: CartService) {
  }


  ngOnInit(): void {
    this.list = this.cart.getItems();
  }

  getDiscountedPrice(p: Product){
    return p.price - (p.price * p.discount / 100);
  }

  getPrice(){
    return this.cart.calculatePrice();
  }

  onDelete(e: Product){
    
  }


}
