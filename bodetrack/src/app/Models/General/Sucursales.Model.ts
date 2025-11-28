export class Sucursales {
  sucs_Id: number = 0;
  sucs_Descripcion: string = '';
  muni_Codigo: string = '';
  sucs_Estado: boolean = true;
  sucs_Creacion: number = 0;
  sucs_FechaCreacion: Date = new Date();
  sucs_Modificacion?: number;
  sucs_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Sucursales>) {
    Object.assign(this, init);
  }
}
