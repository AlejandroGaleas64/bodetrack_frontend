export class Municipios {
  muni_Codigo: string = '';
  muni_Descripcion: string = '';
  dept_Codigo: string = '';
  muni_Estado: boolean = true;
  muni_Creacion: number = 0;
  muni_FechaCreacion: Date = new Date();
  muni_Modificacion?: number;
  muni_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Municipios>) {
    Object.assign(this, init);
  }
}
