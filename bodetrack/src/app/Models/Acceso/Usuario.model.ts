// Interfaz para la respuesta de Login de la API
export interface UsuarioLogin {
  usua_Id?: number;
  usua_NombreUsuario?: string;
  usua_Clave?: string | null;
  usua_EsAdmin?: boolean;
  empl_Id?: number;
  usua_Estado?: boolean;
  usua_Creacion?: number;
  usua_FechaCreacion?: string;
  usua_Modificacion?: number | null;
  usua_FechaModificacion?: string | null;
  
  // Datos del empleado incluidos en la respuesta
  empl_EsJefeBodega?: boolean;
  empl_Nombres?: string;
  empl_Apellidos?: string;
  empl_DNI?: string;
  empl_Sexo?: string;
  empl_Cargo?: string;
  empl_EstadoCivil?: string;
  empl_Municipio?: string;
  empl_Departamento?: string;
  
  // Status de la operación
  // 1 = Éxito, -1 = Advertencia/Conflicto, 0 = Error
  code_Status?: number;
  message_Status?: string;
}

// Clase Usuario para uso general en la aplicación
export class Usuario {
    usua_Id: number = 0;
    usua_NombreUsuario: string = '';
    usua_Clave: string = '';
    usua_EsAdmin: boolean = false;
    empl_Id: number = 0;
    usua_Estado: boolean = false;
    usua_Creacion: number = 0;
    usua_FechaCreacion: Date = new Date();
    usua_Modificacion?: number;
    usua_FechaModificacion?: Date;

    // Datos del empleado
    empl_EsJefeBodega: boolean = false;
    empl_Nombres: string = '';
    empl_Apellidos: string = '';
    empl_DNI: string = '';
    empl_Sexo: string = '';
    empl_Cargo: string = '';
    empl_EstadoCivil: string = '';
    empl_Municipio: string = '';
    empl_Departamento: string = '';

    // Campos de respuesta
    code_Status: number = 0;
    message_Status: string = '';

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }

    // Método helper para obtener nombre completo
    get nombreCompleto(): string {
        return `${this.empl_Nombres} ${this.empl_Apellidos}`.trim();
    }
}