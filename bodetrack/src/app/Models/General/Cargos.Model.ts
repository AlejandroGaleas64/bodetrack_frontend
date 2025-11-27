export interface Cargos {
    carg_Id: number;
    carg_Descripcion: string;
    carg_Estado: boolean;
    carg_Creacion: number;
    carg_FechaCreacion: string;
    carg_Modificacion?: number;
    carg_FechaModificacion?: string;
    
    secuencia?: number;
    usua_Creacion?: number;
    usua_Modificacion?: number;
}
