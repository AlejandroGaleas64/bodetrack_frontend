import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';

// Shared & Models
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveTableService } from 'src/app/shared/services/reactive-table.service';
import { FloatingMenuService } from 'src/app/shared/services/floating-menu.service';
import { Cargos } from 'src/app/Models/General/Cargos.Model';
import { GlobalComponent } from 'src/app/global-component';
import { environment } from 'src/environments/environment';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
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
    EditComponent,
    DetailsComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // Breadcrumbs
  breadCrumbItems!: Array<{}>;

  // UI Flags
  mostrarOverlayCarga = false;
  mostrarFormularioCrear = false;
  mostrarFormularioEditar = false;
  mostrarFormularioDetalles = false;
  
  // Data Selection
  cargoSeleccionado: Cargos | null = null;

  constructor(
    public table: ReactiveTableService<Cargos>,
    public floatingMenuService: FloatingMenuService,
    private http: HttpClient,
    private toastService: ToastrService
  ) {
    this.table.setConfig(['secuencia', 'carg_Descripcion']);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'General' },
      { label: 'Cargos', active: true }
    ];
    this.cargardatos();
  }

  // --- Actions ---

  crear(): void {
    this.mostrarFormularioCrear = true;
    this.mostrarFormularioEditar = false;
    this.mostrarFormularioDetalles = false;
  }

  editar(cargo: Cargos): void {
    this.cargoSeleccionado = { ...cargo };
    this.mostrarFormularioEditar = true;
    this.mostrarFormularioCrear = false;
    this.mostrarFormularioDetalles = false;
  }

  detalles(cargo: Cargos): void {
    this.cargoSeleccionado = { ...cargo };
    this.mostrarFormularioDetalles = true;
    this.mostrarFormularioCrear = false;
    this.mostrarFormularioEditar = false;
  }

  cerrarFormulario(): void {
    this.mostrarFormularioCrear = false;
    this.mostrarFormularioEditar = false;
    this.mostrarFormularioDetalles = false;
    this.cargoSeleccionado = null;
  }

  guardarCargo(cargo: Cargos): void {
    this.cargardatos();
    this.cerrarFormulario();
  }

  // --- API Calls ---

  private cargardatos(): void {
    this.mostrarOverlayCarga = true;
    const url = `${environment.apiUrl}/Cargos/Listar`; 

    this.http.get<any>(url, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          const data = response.data.map((item: Cargos, index: number) => ({
            ...item,
            secuencia: index + 1
          }));
          this.table.setData(data);
        } else {
          this.table.setData([]);
          this.mostrarMensaje('error', 'Formato de respuesta inesperado');
        }
        this.mostrarOverlayCarga = false;
      },
      error: (error) => {
        console.error('Error cargando cargos:', error);
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
