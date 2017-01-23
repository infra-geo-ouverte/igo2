import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

// import { AuthService } from ''../shared/auth/auth.service';

@Component({
  selector: 'igo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  public title: string = environment.title; //
  // protected version: string = "<%= VERSION %>";

  constructor(/*public auth: AuthService*/) { }

  public get userName() {
    return 'User';
    /*if (!this.auth.isAuthenticated) {
      return "";
    }
    return this.auth.decodeToken().nom;*/
  }
}
