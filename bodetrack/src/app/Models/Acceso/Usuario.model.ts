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
  
  empl_EsJefeBodega?: boolean;
  empl_Nombres?: string;
  empl_Apellidos?: string;
  empl_DNI?: string;
  empl_Sexo?: string;
  empl_Cargo?: string;
  empl_EstadoCivil?: string;
  empl_Municipio?: string;
  empl_Departamento?: string;
  
  code_Status?: number;
  message_Status?: string;
}

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

    empl_EsJefeBodega: boolean = false;
    empl_Nombres: string = '';
    empl_Apellidos: string = '';
    empl_DNI: string = '';
    empl_Sexo: string = '';
    empl_Cargo: string = '';
    empl_EstadoCivil: string = '';
    empl_Municipio: string = '';
    empl_Departamento: string = '';

    code_Status: number = 0;
    message_Status: string = '';

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }

    get nombreCompleto(): string {
        return `${this.empl_Nombres} ${this.empl_Apellidos}`.trim();
    }
}