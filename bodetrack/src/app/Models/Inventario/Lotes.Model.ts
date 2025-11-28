export class Lotes {
  lote_Id: number = 0;
  arti_Id: number = 0;
  lote_Codigo: string = '';
  lote_Atributo1: string = '';
  lote_Atributo2: string = '';
  lote_FechaAdmision: string = ''; // DateOnly en C# -> string en TS
  lote_FechaFabricacion: string = ''; // DateOnly en C# -> string en TS
  lote_FechaVencimiento: string = ''; // DateOnly en C# -> string en TS
  lote_CostoUnitario: number = 0;
  lote_CantidadDisponible: number = 0;
  lote_Estado: boolean = true;
  lote_Creacion: number = 0;
  lote_FechaCreacion: Date = new Date();
  lote_Modificacion?: number;
  lote_FechaModificacion?: Date;
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Lotes>) {
    Object.assign(this, init);
  }
}
