export class Departamentos {
  dept_Codigo: string = '';
  dept_Descripcion: string = '';
  dept_Estado: boolean = true;
  dept_Creacion: number = 0;
  dept_FechaCreacion: Date = new Date();
  dept_Modificacion?: number;
  dept_FechaModificacion?: Date;
  usuarioCreacion: string = '';
  usuarioModificacion: string = '';
  code_Status: number = 0;
  secuencia: number = 0;
  message_Status: string = '';

  constructor(init?: Partial<Departamentos>) {
    Object.assign(this, init);
  }
}
