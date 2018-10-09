import { InfoPaginaService } from './../../services/info-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(  public _servicio: InfoPaginaService ) { }

  ngOnInit() {
  }

}
