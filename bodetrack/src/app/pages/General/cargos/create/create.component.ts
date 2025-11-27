import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Cargos } from 'src/app/Models/General/Cargos.Model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Cargos>();

  isFocused = false;
  mostrarErrores = false;

  userData: any;
  private userSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private store: Store<RootReducerState>,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(getUser).subscribe((user) => {
      this.userData = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  cargo: Cargos = {
    carg_Id: 0,
    carg_Descripcion: '',
    carg_Estado: true,
    carg_Creacion: 0,
    carg_FechaCreacion: new Date().toISOString(),
    secuencia: 0
  };

  cancelar(): void {
    this.resetForm();
    this.onCancel.emit();
  }

  resetForm(): void {
    this.mostrarErrores = false;
    this.cargo = {
      carg_Id: 0,
      carg_Descripcion: '',
      carg_Estado: true,
      carg_Creacion: 0,
      carg_FechaCreacion: new Date().toISOString(),
      secuencia: 0
    };
  }

  guardar(): void {
    this.mostrarErrores = true;
    
    if (this.cargo.carg_Descripcion.trim()) {

      // Usar el ID del usuario de la sesión o 0 por defecto si no hay sesión
      const userId = this.userData?.usua_Id || 0;

      const cargoGuardar = {
        carg_Id: 0,
        carg_Descripcion: this.cargo.carg_Descripcion,
        usua_Creacion: userId,
        carg_FechaCreacion: new Date().toISOString(),
        carg_Estado: true
      };

      const url = `${environment.apiUrl}/Cargo/Insertar`;

      this.http.post<any>(url, cargoGuardar, {
        headers: { 
          'x-api-key': environment.apiKey,
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: (response) => {
          const status = response?.data?.code_Status;

          if (status === -1) {
            this.toastService.error(response?.data?.message_Status || 'Error en la operación.', 'Error');
          } else {
            this.toastService.success(`Cargo "${this.cargo.carg_Descripcion}" guardado exitosamente`, 'Éxito');
            this.mostrarErrores = false;
            this.onSave.emit(this.cargo);
            this.resetForm();
          }
        },
        error: (error) => {
          this.toastService.error('Error al guardar el cargo. Por favor, intente nuevamente.', 'Error');
        }
      });
    } else {
      this.toastService.warning('Por favor complete todos los campos requeridos.', 'Advertencia');
    }
  }
}
