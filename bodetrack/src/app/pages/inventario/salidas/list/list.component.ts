import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { Subscription } from 'rxjs';

// Shared & Models
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveTableService } from 'src/app/shared/services/reactive-table.service';
import { FloatingMenuService } from 'src/app/shared/services/floating-menu.service';
import { Salidas } from 'src/app/Models/Inventario/Salidas.Model';
import { GlobalComponent } from 'src/app/global-component';
import { environment } from 'src/environments/environment';
import { CreateComponent } from '../create/create.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    PaginationModule,
    CreateComponent,
    DetailsComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  // Breadcrumbs
  breadCrumbItems!: Array<{}>;

  // Usuario de Sesión
  userData: any;
  private userSubscription?: Subscription;

  // Filtros
  sucursales: any[] = [];
  filtroSucursal: number | null = null;
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  // UI Flags
  mostrarOverlayCarga = false;
  mostrarFormularioCrear = false;
  mostrarFormularioDetalles = false;
  
  // Data Selection
  salidaSeleccionada: Salidas | null = null;

  constructor(
    public table: ReactiveTableService<Salidas>,
    public floatingMenuService: FloatingMenuService,
    private http: HttpClient,
    private toastService: ToastrService,
    private store: Store<RootReducerState>
  ) {
    this.table.setConfig(['secuencia', 'sali_FechaSalida', 'sucursalDestino', 'sali_EstadoSalida', 'sali_CostoTotal']);
  }

  ngOnInit(): void {
    // Obtener usuario de sesión
    this.userSubscription = this.store.select(getUser).subscribe((user) => {
      this.userData = user;
    });

    this.breadCrumbItems = [
      { label: 'Inventario' },
      { label: 'Salidas', active: true }
    ];
    
    this.cargarSucursales();
    this.cargardatos();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // --- Cargar Catálogos ---

  private cargarSucursales(): void {
    this.http.get<any>(`${environment.apiUrl}/Sucursales/Listar`, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (res) => {
        if (res.success) this.sucursales = res.data;
      },
      error: (err) => console.error('Error cargando sucursales:', err)
    });
  }

  aplicarFiltros(): void {
    this.cargardatos();
  }

  limpiarFiltros(): void {
    this.filtroSucursal = null;
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.cargardatos();
  }

  // --- Actions ---

  crear(): void {
    this.mostrarFormularioCrear = true;
    this.mostrarFormularioDetalles = false;
  }

  detalles(salida: Salidas): void {
    this.salidaSeleccionada = { ...salida };
    this.mostrarFormularioDetalles = true;
    this.mostrarFormularioCrear = false;
  }

  cerrarFormulario(): void {
    this.mostrarFormularioCrear = false;
    this.mostrarFormularioDetalles = false;
    this.salidaSeleccionada = null;
  }

  guardarSalida(salida: Salidas): void {
    this.cargardatos();
    this.cerrarFormulario();
  }

  recibirSalida(salida: Salidas): void {
    // Validar estado
    if (salida.sali_EstadoSalida !== 'Enviada a Sucursal') {
      this.toastService.warning('Esta salida ya fue recibida o no está en estado válido');
      return;
    }

    // Validar usuario
    if (!this.userData || !this.userData.usua_Id) {
      this.toastService.error('No se pudo obtener la información del usuario');
      return;
    }

    // Confirmar acción
    const confirmar = confirm(`¿Confirmar recepción de la Salida #${salida.sali_Id}?`);
    if (!confirmar) return;

    const request = {
      sali_Id: salida.sali_Id,
      usua_Creacion: this.userData.usua_Id
    };

    this.mostrarOverlayCarga = true;
    const url = `${environment.apiUrl}/Salidas/Recibir`;

    this.http.put<any>(url, request, {
      headers: { 
        'x-api-key': environment.apiKey,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.success(response.message || 'Salida recibida exitosamente');
          this.cargardatos(); // Recargar lista
          this.cerrarFormulario(); // Cerrar detalles si está abierto
        } else {
          this.toastService.error(response.message || 'Error al recibir la salida');
        }
        this.mostrarOverlayCarga = false;
      },
      error: (error) => {
        console.error('Error recibiendo salida:', error);
        this.toastService.error('Error de conexión al recibir la salida');
        this.mostrarOverlayCarga = false;
      }
    });
  }

  // --- API Calls ---

  cargardatos(): void {
    this.mostrarOverlayCarga = true;
    const url = `${environment.apiUrl}/Salidas/Listar`; 

    this.http.get<any>(url, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          let data = response.data;

          // Aplicar filtros
          if (this.filtroSucursal) {
            data = data.filter((item: any) => item.sucs_Id === this.filtroSucursal);
          }

          if (this.filtroFechaInicio) {
            const fechaInicio = new Date(this.filtroFechaInicio);
            data = data.filter((item: any) => new Date(item.sali_FechaSalida) >= fechaInicio);
          }

          if (this.filtroFechaFin) {
            const fechaFin = new Date(this.filtroFechaFin);
            fechaFin.setHours(23, 59, 59, 999); // Incluir todo el día
            data = data.filter((item: any) => new Date(item.sali_FechaSalida) <= fechaFin);
          }

          // Agregar secuencia
          const dataConSecuencia = data.map((item: Salidas, index: number) => ({
            ...item,
            secuencia: index + 1
          }));
          
          this.table.setData(dataConSecuencia);
        } else {
          this.table.setData([]);
          this.mostrarMensaje('error', 'Formato de respuesta inesperado');
        }
        this.mostrarOverlayCarga = false;
      },
      error: (error) => {
        console.error('Error cargando salidas:', error);
        this.table.setData([]);
        this.mostrarOverlayCarga = false;
        this.mostrarMensaje('error', 'Error al cargar los datos');
      }
    });
  }

  // --- Helpers ---

  private mostrarMensaje(tipo: 'error' | 'success', mensaje: string): void {
    if (tipo === 'error') {
      this.toastService.error(mensaje, 'Error');
    } else if (tipo === 'success') {
      this.toastService.success(mensaje, 'Éxito');
    }
  }
}
