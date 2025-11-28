export class SalidasDetalle {
  sade_Id: number = 0;
  sali_Id: number = 0;
  arti_Id: number = 0;
  lote_Id: number = 0;
  sade_Cantidad: number = 0;
  sade_CostoUnitario: number = 0;
  sade_FechaVencimiento: string = ''; // DateOnly en C# -> string en TS
  sade_Estado: boolean = true;
  sade_Creacion: number = 0;
  sade_FechaCreacion: Date = new Date();
  sade_Modificacion?: number;
  sade_FechaModificacion?: Date;
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<SalidasDetalle>) {
    Object.assign(this, init);
  }
}
