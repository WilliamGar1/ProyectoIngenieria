import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router : Router) { }

  out() {
    localStorage.clear();
    this._router.navigate(['login']);
  }

  ngOnInit(): void {}

  get sesion() {
    return localStorage.getItem('usuario') === null ? false : true;
  }

  get sesion2() {
    return this.sesion && this.user;
  }

  get user() {
    return parseInt(localStorage.getItem('tipo')) === 2 ? false : true;
  }

}
