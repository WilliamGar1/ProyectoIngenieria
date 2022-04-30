import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public newCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  categorias = [];

  constructor(
    private _nodeServer: NodeServerService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }


  private getCategorias() {
    this._nodeServer.getDatosRegistroProducto()
      .subscribe(data => {
        if (data.exito) {
          console.log(data.mensaje);
          this.categorias = data.categorias;
        }
        else {
          console.log(data.mensaje);
        }
  
      }, err => console.log(err));
  }

}
