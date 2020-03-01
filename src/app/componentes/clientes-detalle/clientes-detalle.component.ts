import { cliente } from './../../modelos/cliente';
import { tipoIdentificacion } from './../../modelos/tiposIdentificacion';
import { GenericoService } from 'app/servicios/utiles/generico.service';
import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { UtilesService } from 'app/servicios/utiles/utiles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RequireMatch } from 'app/utiles/custom-validator';
import { A11yModule } from '@angular/cdk/a11y';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientesDetalleComponent implements OnInit {


  clienteForm: FormGroup;

  tiposIdentificacion: any;
  paises: any;
  departamentos: any;
  ciudades: any;
  banderaCargeDepartamento:boolean = false;
  banderaCargeCiudad:boolean = false;


  constructor(
    public dialogRef: MatDialogRef<ClientesDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: cliente,
    private utilesService: UtilesService,
    private genericoService: GenericoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.clienteForm = new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      tipoid: new FormControl(null, [Validators.required, RequireMatch]),
      identificacion: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      pais_nace: new FormControl(null, [Validators.required, RequireMatch]),
      depto_nace: new FormControl(null, [Validators.required, RequireMatch]),
      ciu_nace: new FormControl(null, [Validators.required, RequireMatch]),
      telefono: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
      id: new FormControl(null),
    });
    if (this.data) {
      this.banderaCargeDepartamento = true;
      this.banderaCargeCiudad= true;
      this.cargarFormulario();
    }
    this.obtenerTiposIdentificacion()
    this.obtenerPaises();
  }


  cargarFormulario() {
    this.clienteForm.get('nombres').setValue(this.data.nombres);
    this.clienteForm.get('apellidos').setValue(this.data.apellidos);
    this.clienteForm.get('identificacion').setValue(this.data.identificacion);
    this.clienteForm.get('telefono').setValue(this.data.telefono);
    this.clienteForm.get('correo').setValue(this.data.correo);
    this.clienteForm.get('id').setValue(this.data.id);
  }

  obtenerPaises() {
    this.genericoService.obtenerPaises().subscribe(result => {
      if (result.response.status === 1 && result.response.datos.length > 0) {
        this.paises = result.response.datos;
        if(this.data){
          let pais =this.paises.find(pais=> pais.name == this.data.pais);
          this.clienteForm.get('pais_nace').setValue(pais);
          this.obtenerDepartamentos(pais.id);
        }
      } else if (result.response.status === 1) {
        this.toastr.warning("Cuidado", "No se encontraron paises");
      } else {
        this.toastr.error(result.response.statusText);
      }
    }, error => {
      this.toastr.error(error);
    });
  }

  cambioPais(pais) {
    this.clienteForm.get('depto_nace').setValue(null);
    this.clienteForm.get('ciu_nace').setValue(null);
    this.obtenerDepartamentos(pais.id);
  }

  obtenerDepartamentos(idPais: number) {
    this.genericoService.obtenerDepartamentos(idPais).subscribe(result => {
      if (result.response.status === 1) {
        this.departamentos = result.response.datos;

        if(this.data && this.banderaCargeDepartamento){
          let departamento =this.departamentos.find(departamento=> departamento.name == this.data.estadp);
          this.clienteForm.get('depto_nace').setValue(departamento);
          this.banderaCargeDepartamento = false;
          this.obtenerCiudades(departamento.id);
        }

      } else if (result.response.status === 1) {
        this.toastr.warning("Cuidado", "No se encontraron departamentos por favor seleccione otro pais");
      } else {
        this.toastr.error(result.response.statusText);
      }

    }, error => {
      this.toastr.error(error);
    })
  }

  cambioDepartamento(departamento) {
    this.clienteForm.get('ciu_nace').setValue(null);
    this.obtenerCiudades(departamento.id);
  }

  obtenerCiudades(idDepartamento: number) {
    this.genericoService.obtenerCiudades(idDepartamento).subscribe(result => {
      if (result.response.status === 1 && result.response.datos.length > 0) {
        this.ciudades = result.response.datos;

        if(this.data && this.banderaCargeCiudad){
          let ciudad =this.ciudades.find(ciudad=> ciudad.name == this.data.ciudad);
          this.clienteForm.get('ciu_nace').setValue(ciudad);
          this.banderaCargeCiudad = false;
        }

      } else if (result.response.status === 1) {
        this.toastr.warning("Cuidado", "No se encontraron ciudades por favor seleccione otro departamento");
      } else {
        this.toastr.error(result.response.statusText);
      }
    }, error => {
      this.toastr.error(error);
    })
  }

  obtenerTiposIdentificacion() {
    this.genericoService.obtenerTiposIdentificacion().subscribe(result => {
      if (result.response.status === 1) {
        let tiposId: tipoIdentificacion[] = [];
        for (const key in result.response.datos) {
          if (result.response.datos.hasOwnProperty(key)) {
            let tipoId: tipoIdentificacion = new tipoIdentificacion();
            tipoId.id = key;
            tipoId.nombre = result.response.datos[key];
            tiposId.push(tipoId);
          }
        }
        this.tiposIdentificacion = tiposId;
        if(this.data){
          let tipoId =this.tiposIdentificacion.find(tipoId=> tipoId.nombre == this.data.tipoid);
          this.clienteForm.get('tipoid').setValue(tipoId);
        }
      } else {
        this.toastr.error(result.response.statusText);
      }
    }, error => {
      this.toastr.error(error);
    });
  }

  guardarCliente(cliente: any) {

    let body: any = new HttpParams();
    body = body.append('nombres', cliente.nombres);
    body = body.append('apellidos', cliente.apellidos);
    body = body.append('tipoid', cliente.tipoid.id);
    body = body.append('identificacion', cliente.identificacion);
    body = body.append('pais_nace', cliente.pais_nace.id);
    body = body.append('depto_nace', cliente.depto_nace.id);
    body = body.append('ciu_nace', cliente.ciu_nace.id);
    body = body.append('telefono', cliente.telefono);
    body = body.append('correo', cliente.correo);
    
    if(cliente.id){
      body = body.append('id', cliente.id);
    }

    this.genericoService.guardarCliente(body).subscribe(result => {
      if (result.response.status === 1) {
        this.toastr.success(result.response.message[0]);
        this.dialogRef.close(true);
      } else {
        this.toastr.error(result.response.statusText);
      }
    }, error => {
      this.toastr.error(error);
    });
  }

}
