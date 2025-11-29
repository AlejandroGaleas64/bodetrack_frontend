export class Vehiculos {
  vehi_Id: number = 0;
  vehi_Codigo: string = '';
  vehi_Marca: string = '';
  vehi_Modelo: string = '';
  vehi_Placa: string = '';
  vehi_Anio: number = 0;
  vehi_Estado: boolean = true;
  vehi_Creacion: number = 0;
  vehi_FechaCreacion: Date = new Date();
  vehi_Modificacion?: number;
  vehi_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Vehiculos>) {
    Object.assign(this, init);
  }
}
