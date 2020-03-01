import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  public tituloSubject = new BehaviorSubject<String>("Titulo");
  public titulo$ = this.tituloSubject.asObservable();

  public volverSubject = new BehaviorSubject<any>({ rutaNueva: '', boton: false });
  public volver$ = this.volverSubject.asObservable();

  constructor() { }
  /**
   * Setea el titulo a agregar
   * @param titulo titulo a agregar en app.component
   */
  asignarTitulo(titulo) {
    this.tituloSubject.next(titulo);
  }


  /**
 * envia si desea el boton de volver
 * @param ruta objeto con booleano para mostrar y ruta a redireccionar
 */
  asignarBotonVolver(ruta) {
    this.volverSubject.next(ruta);
  }

  /**
 * realiza la subscripción para titulo y boton volver
 */
  configurarBarra(titulo, ruta?, boton?: boolean) {
    this.asignarTitulo(titulo);
    this.asignarBotonVolver({ rutaNueva: ruta || '/', boton: boton || false });
  }


}
