import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Order } from '../interfaces.def';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  list : Order[] = [];

  searchText: string = '';

  recordsToShow : Order[] = [];

  filter = new FormControl('');

  search(text: string) {
    const term = text.toLowerCase();
    this.recordsToShow = this.list.filter( (obj)=> {
      return obj.user.name.toLowerCase().includes(term)
      || obj.address.city.toLowerCase().includes(term)
      || obj.address.area.toLowerCase().includes(term)
      || obj.user.mobile.toLowerCase().includes(term)
    });
  }

  constructor(private api: ApiService) {
  }


  ngOnInit(): void {
    this.api.getOrders().subscribe((data)=>{
      this.list = data;
      this.recordsToShow = data;
    });
  }

  getOrderStatus(status: number){
    switch(status){
      case 0: return `<span class="badge bg-danger">Canceled</span>`;
      case 1: return `<span class="badge bg-primary">Placed</span>`;
      case 2: return `<span class="badge bg-info">Confirmed</span>`;
      case 3: return `<span class="badge bg-warning">Dispatched</span>`;
      case 4: return `<span class="badge bg-success">Delivered</span>`;
    }
    return '<span class="badge bg-secondary">Invalid</span>';
  }

  onUpdateToNext(o: Order){
    o.status = o.status + 1;
    this.api.updateOrder(o).subscribe((data:any)=>{
      this.ngOnInit();
    });
  }

  onCancel(o: Order){
    o.status = 0;
    this.api.updateOrder(o).subscribe((data:any)=>{
      this.ngOnInit();
    });
  }
}
