import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise(( resolve, reject) => {
      this.http.get('https://angular-html-d5dff.firebaseio.com/productos_idx.json')
      .subscribe ((resp: ProductoInterface[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-d5dff.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {
    if  ( this.productos.length === 0 ) {
      // Cargar Productos
      this.cargarProductos().then(() => {
        // Ejecuta despues de tener los productos
        // Aplicar Filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Aplicar Filtro
      this.filtrarProductos(termino);
    }
  }
  private filtrarProductos( termino: string ) {
    console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
