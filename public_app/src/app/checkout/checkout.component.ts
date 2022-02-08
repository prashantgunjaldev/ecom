import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { CartItem } from '../interfaces.def';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  userInfo: any = {};
  cartItems: CartItem[] = [];
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    addressType: ['', [Validators.required]],
    addrLine1: ['', [Validators.required]],
    addrLine2: ['', [Validators.required]],
    area: ['', [Validators.required]],
    landmark: ['', [Validators.required]],
    city: ['', [Validators.required]],
    pin: ['', [Validators.required]]
  });
  isSubmited: boolean = false;

  constructor(private cart: CartService, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cartItems = this.cart.getItems();
    this.api.profile().subscribe(data=>{
      this.userInfo = data;
    })
  }

  getPrice(){
    return this.cart.calculatePrice();
  }

  isError(field: string): boolean{
    return this.form.controls[field].invalid && (this.isSubmited || this.form.controls[field].dirty || this.form.controls[field].touched)
  }

  onSubmit(){
    this.isSubmited = true;
    if(this.form.valid){
      let data = {...this.form.value, user: this.userInfo};
      //Create Address
      this.api.createAddress(data).subscribe((data: any)=>{
        if(data){
          console.log(data);
          // Create Order
          let oderData = {
            status: 1,
            orderType: 'cod',
            orderAmount: 100,
            user: this.userInfo,
            address: data
          }
          //Display order placed messages
        }
        // this.form.reset();
      });
    }
  }
}
