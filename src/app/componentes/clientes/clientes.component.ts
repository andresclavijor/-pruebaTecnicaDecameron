import { GenericoService } from 'app/servicios/utiles/generico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { cliente } from 'app/modelos/cliente';
import { HttpParams } from '@angular/common/http';
import { UtilesService } from 'app/servicios/utiles/utiles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesDetalleComponent } from '../clientes-detalle/clientes-detalle.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['nombres', "apellidos", "tipoid", "identificacion", "opciones"];
  @ViewChild(MatSort) sort: MatSort;
  data: cliente[] = [];
  dataSource = new MatTableDataSource();
  paginaActual: number = 0;
  deshabilitarSiguiente: boolean = false;
  columnsToDisplay = ['nombres'];
  expandedElement: any | null;
  consultarForm: FormGroup;


  constructor(
    private spinner: NgxSpinnerService,
    private genericoService: GenericoService,
    private utilesService: UtilesService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.consultarForm = new FormGroup({
      filtro: new FormControl("", Validators.required),
  });
    this.obtenerClientes(true);
    this.configurarBarra();
  }


  configurarBarra() {
    this.utilesService.configurarBarra("Clientes");
  }

  obtenerClientes(pagina: boolean, filtro?: any) {
    this.spinner.show();
    let body: any = new HttpParams();
    if(filtro){
      body = body.append('busca', filtro.filtro);
    }else{
      this.paginaActual = pagina ? this.paginaActual += 1 : this.paginaActual -= 1;
    }
    body = body.append('pagina', this.paginaActual);
    this.genericoService.ObtenerPersonas(body).subscribe(result => {
      this.spinner.hide();
      if (result.response.status === 1) {
        this.deshabilitarSiguiente = result.response.resultado.length < 10 ? true : false;
        this.dataSource = new MatTableDataSource<any>(result.response.resultado);
        this.dataSource.sort = this.sort;
      } else {
        this.toastr.error(result.response.statusText);
      }
    }, error => {
      this.toastr.error(error);
      this.paginaActual = pagina ? this.paginaActual -= 1 : this.paginaActual += 1;
      this.spinner.hide();
    })
  }

  visualizarCliente(element: cliente) {
    const dialogRef = this.dialog.open(ClientesDetalleComponent, {
      panelClass: 'event-form-dialog-parametros',
      width: '500px',
      height: '475px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.paginaActual = 0;
        this.obtenerClientes(true);
      }
    });
  }

}
