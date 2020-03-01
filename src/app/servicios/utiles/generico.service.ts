import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, from } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class GenericoService extends HttpService{


  ObtenerPersonas(body:any): Observable<any> {
    return this.post<any>("listarclientes",body);
  }

  obtenerPaises(): Observable<any>{
    return this.get<any>("countries");
  }

  obtenerDepartamentos(codigoPais): Observable<any>{
    return this.get<any>(`states/${codigoPais}`);
  }

  obtenerCiudades(codigoPais): Observable<any>{
    return this.get<any>(`cities/${codigoPais}`);
  }

  obtenerTiposIdentificacion(): Observable<any>{
    return this.get<any>(`tidentificacion`);
  }

  guardarCliente(body:any): Observable<any> {
    return this.post<any>("registration",body);
  }

}
