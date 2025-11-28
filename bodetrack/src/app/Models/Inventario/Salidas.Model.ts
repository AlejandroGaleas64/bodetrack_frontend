export class Salidas {
    sali_Id: number = 0;
    sucs_Id: number = 0;
    sali_FechaSalida: Date = new Date();
    sali_EstadoSalida: string = "";
    sali_CostoTotal: number = 0;
    sali_UsuarioEnvia: number = 0;
    sali_UsuarioRecibe?: number;
    vehi_Id?: number;
    sali_Transportista?: number;
    sali_FechaRecepcion?: Date;
    sali_GuiaRemision?: string;
    sali_Estado: boolean = true;
    
    // Auditoría
    sali_Creacion: number = 0;
    sali_FechaCreacion: Date = new Date();
    sali_Modificacion?: number;
    sali_FechaModificacion?: Date;

    // Propiedades de Lectura (API Response)
    sucursalDestino?: string;
    unidadesTotales?: number;
    usuarioEnvia?: string;
    usuarioRecibe?: string;
    vehiculo?: string;
    transportista?: string;
    detalleSalida?: string; // JSON string

    constructor(init?: Partial<Salidas>) {
        Object.assign(this, init);
    }
}
