import { Component, OnInit } from '@angular/core';
import { NodeServerService } from 'src/app/services/node-server.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor(
    private _nodeServer: NodeServerService
  ) { }

  denuncias = []

  ngOnInit(): void {
    this.getDenuncias();
  }

  private getDenuncias(){
    this._nodeServer.getDenuncias()
      .subscribe(data => {
        this.denuncias = data.denuncias;
        console.log(this.denuncias);
      })
  }

}
