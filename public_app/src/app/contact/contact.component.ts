import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Contact } from '../interfaces.def';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    contactNo: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    query: ['', [Validators.required]]
  });
  isSuccess = false;
  isSubmited = false;
  isInvalid = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

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
      this.api.createContact(this.form.value).subscribe((data: any)=>{
        this.isSuccess = true;
        this.form.reset();
        this.isSubmited = false;
      });
    }
      
  }

}
