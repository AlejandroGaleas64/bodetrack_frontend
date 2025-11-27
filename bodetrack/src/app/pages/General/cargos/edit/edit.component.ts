import { Component, Output, EventEmitter, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() cargoData: Cargos | null = null;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Cargos>();

  isFocused = false;
  mostrarErrores = false;

  userData: any;
  private userSubscription?: Subscription;

  cargo: Cargos = {
    carg_Id: 0,
    carg_Descripcion: '',
    carg_Estado: true,
    carg_Creacion: 0,
    carg_FechaCreacion: '',
    secuencia: 0
  };

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cargoData'] && changes['cargoData'].currentValue) {
      this.cargo = { ...changes['cargoData'].currentValue };
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  cancelar(): void {
    this.resetForm();
    this.onCancel.emit();
  }

  resetForm(): void {
    this.mostrarErrores = false;
  }

  guardar(): void {
    this.mostrarErrores = true;
    
    if (this.cargo.carg_Descripcion.trim()) {

      const userId = this.userData?.usua_Id || 0;

      const cargoEditar = {
        carg_Id: this.cargo.carg_Id,
        carg_Descripcion: this.cargo.carg_Descripcion,
        usua_Modificacion: userId,
        carg_FechaModificacion: new Date().toISOString()
      };

      const url = `${environment.apiUrl}/Cargo/Editar`;

      this.http.put<any>(url, cargoEditar, {
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
            this.toastService.success(`Cargo "${this.cargo.carg_Descripcion}" actualizado exitosamente`, 'Éxito');
            this.mostrarErrores = false;
            this.onSave.emit(this.cargo);
          }
        },
        error: (error) => {
          this.toastService.error('Error al actualizar el cargo. Por favor, intente nuevamente.', 'Error');
        }
      });
    } else {
      this.toastService.warning('Por favor complete todos los campos requeridos.', 'Advertencia');
    }
  }
}
