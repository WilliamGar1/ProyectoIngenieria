import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombre: string = 'Juan';

  apellido: string = 'Perez';

  depto: string = 'Comayagua';

  correo: string = 'juan.perez@unah.hn';

  celular: string = '9675-8796';

  cat: any = ['Ropa', 'Electronicos'];

  constructor() { }

  ngOnInit(): void {
  }

}
