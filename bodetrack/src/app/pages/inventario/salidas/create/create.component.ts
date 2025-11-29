import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Salidas } from 'src/app/Models/Inventario/Salidas.Model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { getUser } from 'src/app/store/Authentication/authentication-selector';
import { Subscription } from 'rxjs';

interface Articulo {
  arti_Id: number;
  arti_Codigo: string;
  arti_Descripcion: string;
  lotes: string;
  stockTotal?: number;
  lotesDisponibles?: any[];
}

interface DetalleItem {
  arti_Id: number;
  arti_Codigo: string;
  arti_Descripcion: string;
  cantidad: number;
  stockDisponible: number;
  costoUnitarioPromedio: number;  // Costo promedio ponderado
  costoTotal: number;  // cantidad * costoUnitarioPromedio
  lotesUsados: LoteUsado[];  // Detalles de los lotes seleccionados por FIFO
}

interface LoteUsado {
  lote_Id: number;
  lote_Codigo: string;
  cantidad: number;
  costoUnitario: number;
  fechaVencimiento: string;
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Salidas>();

  // Usuario de Sesión
  userData: any;
  private userSubscription?: Subscription;

  // Catálogos
  sucursales: any[] = [];
  vehiculos: any[] = [];
  empleados: any[] = [];
  articulos: Articulo[] = [];
  
  // Formulario
  sucs_Id: number | null = null;
  vehi_Id: number | null = null;
  sali_Transportista: number | null = null;
  
  // Grid de Detalles
  detalles: DetalleItem[] = [];
  
  // Selección de Producto
  articuloSeleccionado: number | null = null;
  cantidadSeleccionada: number = 1;
  
  // Estado
  cargando = false;
  guardando = false;

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private store: Store<RootReducerState>
  ) {}

  ngOnInit(): void {
    // Obtener usuario de sesión
    this.userSubscription = this.store.select(getUser).subscribe((user) => {
      this.userData = user;
    });
    
    this.cargarCatalogos();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private cargarCatalogos(): void {
    this.cargando = true;
    
    // Cargar Sucursales
    this.http.get<any>(`${environment.apiUrl}/Sucursales/Listar`, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (res) => {
        if (res.success) this.sucursales = res.data;
      },
      error: (err) => console.error('Error cargando sucursales:', err)
    });

    // Cargar Vehículos
    this.http.get<any>(`${environment.apiUrl}/Vehiculos/Listar`, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (res) => {
        if (res.success) this.vehiculos = res.data;
      },
      error: (err) => console.error('Error cargando vehículos:', err)
    });

    // Cargar Empleados
    this.http.get<any>(`${environment.apiUrl}/Empleados/Listar`, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (res) => {
        if (res.success) this.empleados = res.data;
      },
      error: (err) => console.error('Error cargando empleados:', err)
    });

    // Cargar Artículos con Stock
    this.http.get<any>(`${environment.apiUrl}/Articulos/ListarConDetalle`, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.articulos = res.data.map((art: Articulo) => {
            const lotes = art.lotes ? JSON.parse(art.lotes) : [];
            const stockTotal = lotes.reduce((sum: number, l: any) => sum + (l.Lote_CantidadDisponible || 0), 0);
            return {
              ...art,
              lotesDisponibles: lotes,
              stockTotal: stockTotal
            };
          }).filter((art: Articulo) => (art.stockTotal || 0) > 0); // Solo artículos con stock
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando artículos:', err);
        this.cargando = false;
      }
    });
  }

  agregarDetalle(): void {
    if (!this.articuloSeleccionado || this.cantidadSeleccionada <= 0) {
      this.toastService.warning('Seleccione un artículo y una cantidad válida');
      return;
    }

    const articulo = this.articulos.find(a => a.arti_Id === this.articuloSeleccionado);
    if (!articulo) return;

    // Validar stock
    if (this.cantidadSeleccionada > (articulo.stockTotal || 0)) {
      this.toastService.error(`Stock insuficiente. Disponible: ${articulo.stockTotal}`);
      return;
    }

    // Verificar si ya existe en el grid
    const existente = this.detalles.find(d => d.arti_Id === this.articuloSeleccionado);
    if (existente) {
      this.toastService.warning('El artículo ya está agregado. Elimínelo primero si desea modificar la cantidad.');
      return;
    }

    // === CALCULAR COSTOS CON FIFO ===
    const resultadoFIFO = this.calcularCostosConFIFO(articulo, this.cantidadSeleccionada);
    
    if (!resultadoFIFO) {
      this.toastService.error('Error al calcular costos. Intente nuevamente.');
      return;
    }

    // Agregar al grid con costos calculados
    this.detalles.push({
      arti_Id: articulo.arti_Id,
      arti_Codigo: articulo.arti_Codigo,
      arti_Descripcion: articulo.arti_Descripcion,
      cantidad: this.cantidadSeleccionada,
      stockDisponible: articulo.stockTotal || 0,
      costoUnitarioPromedio: resultadoFIFO.costoUnitarioPromedio,
      costoTotal: resultadoFIFO.costoTotal,
      lotesUsados: resultadoFIFO.lotesUsados
    });

    // Resetear selección
    this.articuloSeleccionado = null;
    this.cantidadSeleccionada = 1;
  }

  /**
   * Simula la lógica FIFO del backend para calcular costos
   */
  private calcularCostosConFIFO(articulo: Articulo, cantidadRequerida: number): {
    costoUnitarioPromedio: number;
    costoTotal: number;
    lotesUsados: LoteUsado[];
  } | null {
    if (!articulo.lotesDisponibles || articulo.lotesDisponibles.length === 0) {
      return null;
    }

    // Ordenar lotes por fecha de vencimiento (FIFO)
    const lotesOrdenados = [...articulo.lotesDisponibles].sort((a, b) => {
      const fechaA = new Date(a.Lote_FechaVencimiento);
      const fechaB = new Date(b.Lote_FechaVencimiento);
      return fechaA.getTime() - fechaB.getTime();
    });

    let cantidadRestante = cantidadRequerida;
    let costoAcumulado = 0;
    const lotesUsados: LoteUsado[] = [];

    for (const lote of lotesOrdenados) {
      if (cantidadRestante <= 0) break;

      const cantidadDisponible = lote.Lote_CantidadDisponible || 0;
      if (cantidadDisponible <= 0) continue;

      // Tomar lo que se pueda de este lote
      const cantidadTomar = Math.min(cantidadRestante, cantidadDisponible);
      const costoUnitario = lote.Lote_CostoUnitario || 0;

      costoAcumulado += cantidadTomar * costoUnitario;
      cantidadRestante -= cantidadTomar;

      lotesUsados.push({
        lote_Id: lote.Lote_Id,
        lote_Codigo: lote.Lote_Codigo,
        cantidad: cantidadTomar,
        costoUnitario: costoUnitario,
        fechaVencimiento: lote.Lote_FechaVencimiento
      });
    }

    // Si no se pudo completar la cantidad, retornar null
    if (cantidadRestante > 0) {
      this.toastService.error('Stock insuficiente en lotes disponibles');
      return null;
    }

    const costoTotal = costoAcumulado;
    const costoUnitarioPromedio = costoTotal / cantidadRequerida;

    return {
      costoUnitarioPromedio,
      costoTotal,
      lotesUsados
    };
  }

  eliminarDetalle(index: number): void {
    this.detalles.splice(index, 1);
  }

  /**
   * Calcula el costo total de todos los productos en el grid
   */
  get costoTotalSalida(): number {
    return this.detalles.reduce((sum, item) => sum + item.costoTotal, 0);
  }

  /**
   * Calcula el total de unidades de todos los productos
   */
  get unidadesTotales(): number {
    return this.detalles.reduce((sum, item) => sum + item.cantidad, 0);
  }

  guardar(): void {
    // Validaciones
    if (!this.sucs_Id) {
      this.toastService.warning('Seleccione una sucursal de destino');
      return;
    }

    if (this.detalles.length === 0) {
      this.toastService.warning('Agregue al menos un artículo a la salida');
      return;
    }

    // Validar que el usuario esté logueado
    if (!this.userData || !this.userData.usua_Id) {
      this.toastService.error('No se pudo obtener la información del usuario');
      return;
    }

    // === VALIDAR LÍMITE DE L 5,000 ===
    // Obtener salidas pendientes de la sucursal seleccionada
    const url = `${environment.apiUrl}/Salidas/Listar`;
    this.http.get<any>(url, {
      headers: { 'x-api-key': environment.apiKey }
    }).subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          // Calcular total pendiente de la sucursal
          const totalPendiente = response.data
            .filter((s: any) => 
              s.sucs_Id === this.sucs_Id && 
              s.sali_EstadoSalida === 'Enviada a Sucursal'
            )
            .reduce((sum: number, s: any) => sum + (s.sali_CostoTotal || 0), 0);

          const totalConNuevaSalida = totalPendiente + this.costoTotalSalida;

          if (totalConNuevaSalida > 5000) {
            this.toastService.error(
              `La sucursal supera el límite de L 5,000. ` +
              `Pendiente: L ${totalPendiente.toFixed(2)}, ` +
              `Nueva salida: L ${this.costoTotalSalida.toFixed(2)}, ` +
              `Total: L ${totalConNuevaSalida.toFixed(2)}`
            );
            return;
          }

          // Si pasa la validación, enviar
          this.enviarSalida();
        } else {
          // Si falla la consulta, enviar de todas formas (el backend validará)
          this.enviarSalida();
        }
      },
      error: () => {
        // Si falla la consulta, enviar de todas formas (el backend validará)
        this.enviarSalida();
      }
    });
  }

  private enviarSalida(): void {
    const usuarioId = this.userData.usua_Id;

    const request = {
      sucs_Id: this.sucs_Id,
      sali_UsuarioEnvia: usuarioId,
      vehi_Id: this.vehi_Id || null,
      sali_Transportista: this.sali_Transportista || null,
      sali_Creacion: usuarioId,
      sali_FechaCreacion: new Date().toISOString(),
      detalles: this.detalles.map(d => ({
        arti_Id: d.arti_Id,
        sade_Cantidad: d.cantidad
      }))
    };

    this.guardando = true;
    this.http.post<any>(`${environment.apiUrl}/Salidas/Insertar`, request, {
      headers: { 
        'x-api-key': environment.apiKey,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.success(res.message || 'Salida creada exitosamente');
          this.onSave.emit(new Salidas());
          this.resetForm();
        } else {
          this.toastService.error(res.message || 'Error al crear la salida');
        }
        this.guardando = false;
      },
      error: (err) => {
        console.error('Error guardando salida:', err);
        this.toastService.error('Error de conexión al guardar la salida');
        this.guardando = false;
      }
    });
  }

  /**
   * Genera texto para tooltip con información de lotes
   */
  getLotesTooltip(item: DetalleItem): string {
    return item.lotesUsados.map(lote => 
      `${lote.lote_Codigo}: ${lote.cantidad} uds @ L${lote.costoUnitario.toFixed(2)} (Vto: ${new Date(lote.fechaVencimiento).toLocaleDateString()})`
    ).join('\n');
  }

  resetForm(): void {
    this.sucs_Id = null;
    this.vehi_Id = null;
    this.sali_Transportista = null;
    this.detalles = [];
    this.articuloSeleccionado = null;
    this.cantidadSeleccionada = 1;
  }

  cancelar(): void {
    this.onCancel.emit();
  }
}
