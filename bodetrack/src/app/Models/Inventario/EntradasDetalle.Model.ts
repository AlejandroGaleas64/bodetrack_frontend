export class EntradasDetalle {
  ende_Id: number = 0;
  entr_Id: number = 0;
  arti_Id: number = 0;
  ende_Cantidad: number = 0;
  ende_CostoUnitario: number = 0;
  ende_LoteCodigo: string = '';
  ende_FechaVencimiento: string = ''; // DateOnly en C# -> string en TS
  ende_FechaFabricacion: string = ''; // DateOnly en C# -> string en TS
  ende_Estado: boolean = true;
  ende_Creacion: number = 0;
  ende_FechaCreacion: Date = new Date();
  ende_Modificacion?: number;
  ende_FechaModificacion?: Date;
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<EntradasDetalle>) {
    Object.assign(this, init);
  }
}
