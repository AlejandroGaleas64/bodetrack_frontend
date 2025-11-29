export class Empleados {
  empl_Id: number = 0;
  empl_Codigo: string = '';
  empl_Nombres: string = '';
  empl_Apellidos: string = '';
  empl_Sexo: string = '';
  empl_FechaNacimiento: string = ''; // DateOnly en C# -> string en TS
  empl_DNI: string = '';
  empl_Direccion: string = '';
  muni_Codigo: string = '';
  esCi_Id: number = 0;
  carg_Id: number = 0;
  empl_EsJefeBodega: boolean = false;
  empl_Estado: boolean = true;
  empl_Creacion: number = 0;
  empl_FechaCreacion: Date = new Date();
  empl_Modificacion?: number;
  empl_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Empleados>) {
    Object.assign(this, init);
  }
}
