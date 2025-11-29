export class Articulos {
  arti_Id: number = 0;
  arti_Codigo: string = '';
  arti_CodigoBarras: string = '';
  arti_Descripcion: string = '';
  arti_Estado: boolean = true;
  arti_Creacion: number = 0;
  arti_FechaCreacion: Date = new Date();
  arti_Modificacion?: number;
  arti_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Articulos>) {
    Object.assign(this, init);
  }
}
