import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private urlBase: string = environment.urlServicios;
  constructor(
    private http: HttpClient,
  ) { }

  protected ConstruirEncabezados(): HttpHeaders {
    return   new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  protected get<T>(ruta: string): Observable<T> {
    const url: string = this.urlBase + ruta;
    const httpOptions = { headers: this.ConstruirEncabezados() };

    return this.http.get<T>(url, httpOptions).pipe(
      catchError(this.manejoError)
    );
  }

  public post<T>(ruta: string, cuerpo: any, encabezados?: any): Observable<T> {
    const url: string = this.urlBase + ruta;
    const httpOptions = { headers: this.ConstruirEncabezados() };

    return this.http.post<T>(url, cuerpo, httpOptions).pipe(
      catchError(this.manejoError)
    );
  }

  private manejoError(error: HttpErrorResponse) {
    let mensaje: string;

    if (error.status == 0)
      mensaje = "Verifique la conexión del equipo a la red.";
    else
      if (error.status == 400)
        mensaje = error.error.Message;
      else
        mensaje = "Ha sucedido un error al procesar la solicitud. Intente más tarde por favor.";

    return throwError(mensaje);
  }
}
