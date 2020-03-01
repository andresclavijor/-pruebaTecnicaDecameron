import { Component, OnInit } from '@angular/core';
import { UtilesService } from 'app/servicios/utiles/utiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public util:UtilesService
  ) { 
    util.asignarTitulo("Home Page")
  }

  ngOnInit() {
  }

}
