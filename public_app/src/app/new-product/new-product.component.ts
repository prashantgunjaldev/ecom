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
    fileSource: ['', [Validators.required]],
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

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit(){
    this.isSuccess = false;
    this.isSubmited = true;
    this.isInvalid = false;
    if(this.form.valid){
      //Upload image
      const formData = new FormData();
      formData.append('image', this.form.get('fileSource')?.value);
      this.api.uploadImage(formData).subscribe((data:any)=>{
        if(data && data.filename){
          // Collect image path
          let product = this.form.value;
          delete product.fileSource;
          product.image = data.filename;
          // Create product
          this.api.createProduct(product).subscribe((data: any)=>{
            this.isSuccess = true;
            this.form.reset();
            this.isSubmited = false;
          });
        }else{
          this.isSuccess = false;
        }
      });
    }else{
      console.log("Please provide valid information");
    }
    
  }
}
