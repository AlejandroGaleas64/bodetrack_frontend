import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Salidas } from 'src/app/Models/Inventario/Salidas.Model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';

interface DetalleSalidaItem {
  Sade_Id: number;
  Arti_Codigo: string;
  Articulo: string;
  Lote_Codigo: string;
  Sade_Cantidad: number;
  Sade_CostoUnitario: number;
  Sade_FechaVencimiento: string;
  Subtotal: number;
  Sade_Creacion: number;
  UsuaCreacionDetalle: string;
  Sade_FechaCreacion: string;
}

import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ConfirmationComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnChanges {
  // Recibe el registro cuyos detalles se mostrarán
  @Input() salidaData: Salidas | null = null;
  // Emite evento para cerrar el panel de detalles
  @Output() onCancel = new EventEmitter<void>();
  // Emite evento cuando se recibe la salida
  @Output() onRecibir = new EventEmitter<void>();

  // Estado local para presentar la información
  salidaDetalle: any = null;
  detallesProductos: DetalleSalidaItem[] = [];
  cargando = false;
  userData: any;
  
  // Modal de confirmación
  mostrarConfirmacion = false;

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private store: Store<RootReducerState>
  ) {
    // Obtener usuario de sesión
    this.store.select(getUser).subscribe((user) => {
      this.userData = user;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salidaData'] && changes['salidaData'].currentValue) {
      this.cargarDetallesCompletos(changes['salidaData'].currentValue);
    }
  }

  private cargarDetallesCompletos(salida: Salidas): void {
    if (!salida.sali_Id) {
      this.toastService.error('ID de salida no válido');
      return;
    }

    this.cargando = true;
    const url = `${environment.apiUrl}/Salidas/ObtenerCompleta/${salida.sali_Id}`;

    this.http.get<any>(url, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.salidaDetalle = response.data;
          this.procesarDetallesSalida(response.data.detalleSalida);
        } else {
          this.toastService.error('Error al cargar los detalles de la salida');
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error cargando detalles:', error);
        this.toastService.error('Error de conexión al cargar detalles');
        this.cargando = false;
      }
    });
  }

  private procesarDetallesSalida(detallesJson: string): void {
    try {
      if (detallesJson) {
        this.detallesProductos = JSON.parse(detallesJson);
      } else {
        this.detallesProductos = [];
      }
    } catch (e) {
      console.error('Error al parsear detalleSalida JSON:', e);
      this.detallesProductos = [];
      this.toastService.warning('No se pudo cargar el detalle de productos');
    }
  }

  recibirSalida(): void {
    if (!this.salidaDetalle) return;

    // Validar estado
    if (this.salidaDetalle.sali_EstadoSalida !== 'Enviada a Sucursal') {
      this.toastService.warning('Esta salida ya fue recibida o no está en estado válido');
      return;
    }

    // Validar usuario
    if (!this.userData || !this.userData.usua_Id) {
      this.toastService.error('No se pudo obtener la información del usuario');
      return;
    }

    // Confirmar acción con modal
    this.mostrarConfirmacion = true;
  }

  confirmarRecepcion(): void {
    if (!this.salidaDetalle) return;
    
    this.mostrarConfirmacion = false;

    const request = {
      sali_Id: this.salidaDetalle.sali_Id,
      usua_Creacion: this.userData.usua_Id
    };

    this.cargando = true;
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
          this.onRecibir.emit(); // Notificar al componente padre
          this.cerrar();
        } else {
          this.toastService.error(response.message || 'Error al recibir la salida');
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error recibiendo salida:', error);
        this.toastService.error('Error de conexión al recibir la salida');
        this.cargando = false;
      }
    });
  }

  cerrar(): void {
    this.onCancel.emit();
    this.salidaDetalle = null;
    this.detallesProductos = [];
  }
}
