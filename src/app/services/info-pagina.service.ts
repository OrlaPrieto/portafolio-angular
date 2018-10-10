import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient) {
    // console.log('Servicio funcionando infoPagina');

  this.cargarInfo();
  this.cargarEquipo();


  }

  private cargarInfo() {
    // Leer archivo JSON
    this.http.get('assets/data/data.pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;

    });
  }

  private cargarEquipo() {
    // Leer archivo Firebase
    this.http.get('https://angular-html-d5dff.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {

      this.equipo = resp;

      // console.log(resp);
    });
  }
}
