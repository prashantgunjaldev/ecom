import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    price: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    rating: [5],
    quantity: ['', [Validators.required]],
  });
  isSuccess = false;
  isSubmited = false;
  isInvalid = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  isError(field: string): boolean{
    return this.form.controls[field].invalid && (this.isSubmited || this.form.controls[field].dirty || this.form.controls[field].touched)
  }

  onSubmit(){
    
    this.isSuccess = false;
    this.isSubmited = true;
    this.isInvalid = false;
    if(this.form.valid){
      this.api.createProduct(this.form.value).subscribe((data: any)=>{
        this.isSuccess = true;
      });
    }else{
      console.log("Please provide valid information");
    }
    
  }
}
