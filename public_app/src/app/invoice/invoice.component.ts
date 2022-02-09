import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Order } from '../interfaces.def';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  od : Order= {"id":8,"status":1,
  "orderType":"cod",
  "orderAmount":376,
  "created_at":new Date(),
  "updated_at":new Date(),
  "orderDetails":[],
  "address":{"id":17,"name":"Prashant Gunjal","addressType":"Home","addrLine1":"1","addrLine2":"Abc","area":"Karvenagr","landmark":"Mediaca;","city":"Pune","pin":"411052"},
  "user":{"id":2,"name":"Test 3","mobile":"8275269127"}};
  constructor(private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.api.getOrder(id).subscribe(data=>{
      this.od = data;
    })
  }

  getDiscountedPrice(p:any){
    return p.price - (p.price * p.discount / 100);
  }

}
