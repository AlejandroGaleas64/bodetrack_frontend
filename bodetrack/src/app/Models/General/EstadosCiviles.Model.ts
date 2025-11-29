export class EstadosCiviles {
  esCi_Id: number = 0;
  esCi_Descripcion: string = '';
  esCi_Estado: boolean = true;
  esCi_Creacion: number = 0;
  esCi_FechaCreacion: Date = new Date();
  esCi_Modificacion?: number;
  esCi_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<EstadosCiviles>) {
    Object.assign(this, init);
  }
}
