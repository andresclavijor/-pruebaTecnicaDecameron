import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatExpansionModule, MatGridListModule } from '@angular/material';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './componentes/home/home.component';
import { UtilesService } from './servicios/utiles/utiles.service';
import { MaterialModule } from './material.module';
import { GenericoService } from './servicios/utiles/generico.service';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ClientesDetalleComponent } from './componentes/clientes-detalle/clientes-detalle.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ClientesComponent,
        ClientesDetalleComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        LayoutModule,
        MaterialModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule
    ],
    providers: [
        UtilesService,
        GenericoService,
        ClientesDetalleComponent
    ],
    entryComponents: [
        ClientesDetalleComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
