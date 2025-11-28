export class Entradas {
  entr_Id: number = 0;
  entr_NumeroFactura: string = '';
  entr_FechaEntrada: Date = new Date();
  entr_Observacion: string = '';
  entr_Estado: boolean = true;
  entr_Creacion: number = 0;
  entr_FechaCreacion: Date = new Date();
  entr_Modificacion?: number;
  entr_FechaModificacion?: Date;
  usua_Creacion: string = '';
  usua_Modificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Entradas>) {
    Object.assign(this, init);
  }
}
