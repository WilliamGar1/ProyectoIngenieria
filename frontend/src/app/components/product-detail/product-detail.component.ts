import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  nombre: string = "Celular";
  precio: number = 1200;
  descripcion: string =
    `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Repudiandae, possimus? Omnis cumque nesciunt,
      illum earum sint repudiandae assumenda ex exercitationem autem esse saepe ducimus, ad ea molestiae. 
      Voluptate, aliquid libero.`;
  hora = Date.now();
  categoria: string = "Celulares";

  constructor() {}

  ngOnInit(): void {}
}
