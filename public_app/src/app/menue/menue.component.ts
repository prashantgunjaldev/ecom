import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class MenueComponent implements OnInit {

  constructor(private session: SessionService,
    private router: Router) { }
  
    isLoggedIn(): boolean{
      if(this.session.getToken()){
        return true;
      }
      return false;
    }

  ngOnInit(): void {
  }

  logout(){
    this.session.deleteToken();
    this.router.navigateByUrl("login");
  }

}
