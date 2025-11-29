
public partial class tbArticulos
{
    public int Arti_Id { get; set; }

    public string Arti_Codigo { get; set; }

    public string Arti_CodigoBarras { get; set; }

    public string Arti_Descripcion { get; set; }

    public bool Arti_Estado { get; set; }

    public int Arti_Creacion { get; set; }

    public DateTime Arti_FechaCreacion { get; set; }

    public int? Arti_Modificacion { get; set; }

    public DateTime? Arti_FechaModificacion { get; set; }


}


public partial class tbCargos
{
    public int Carg_Id { get; set; }

    public string Carg_Descripcion { get; set; }

    public bool Carg_Estado { get; set; }

    public int Carg_Creacion { get; set; }

    public DateTime Carg_FechaCreacion { get; set; }

    public int? Carg_Modificacion { get; set; }

    public DateTime? Carg_FechaModificacion { get; set; }

    [NotMapped]
    public string Usua_Creacion { get; set; }

    [NotMapped]
    public string Usua_Modificacion { get; set; }



}

public partial class tbDepartamentos
{
    public string Dept_Codigo { get; set; }

    public string Dept_Descripcion { get; set; }

    public bool Dept_Estado { get; set; }

    public int Dept_Creacion { get; set; }

    public DateTime Dept_FechaCreacion { get; set; }

    public int? Dept_Modificacion { get; set; }

    public DateTime? Dept_FechaModificacion { get; set; }
}


public partial class tbEmpleados
{
    public int Empl_Id { get; set; }

    public string Empl_Codigo { get; set; }

    public string Empl_Nombres { get; set; }

    public string Empl_Apellidos { get; set; }

    public string Empl_Sexo { get; set; }

    public DateOnly Empl_FechaNacimiento { get; set; }

    public string Empl_DNI { get; set; }

    public string Empl_Direccion { get; set; }

    public string Muni_Codigo { get; set; }

    public int EsCi_Id { get; set; }

    public int Carg_Id { get; set; }

    public bool Empl_EsJefeBodega { get; set; }

    public bool Empl_Estado { get; set; }

    public int Empl_Creacion { get; set; }

    public DateTime Empl_FechaCreacion { get; set; }

    public int? Empl_Modificacion { get; set; }

    public DateTime? Empl_FechaModificacion { get; set; }

    
}


public partial class tbEntradas
{
    public int Entr_Id { get; set; }

    public string Entr_NumeroFactura { get; set; }

    public DateTime Entr_FechaEntrada { get; set; }

    public string Entr_Observacion { get; set; }

    public bool Entr_Estado { get; set; }

    public int Entr_Creacion { get; set; }

    public DateTime Entr_FechaCreacion { get; set; }

    public int? Entr_Modificacion { get; set; }

    public DateTime? Entr_FechaModificacion { get; set; }

    [NotMapped]
    public string Usua_Creacion { get; set; }

    [NotMapped]
    public string Usua_Modificacion { get; set; }
}


public partial class tbEntradasDetalle
{
    public int Ende_Id { get; set; }

    public int Entr_Id { get; set; }

    public int Arti_Id { get; set; }

    public int Ende_Cantidad { get; set; }

    public decimal Ende_CostoUnitario { get; set; }

    public string Ende_LoteCodigo { get; set; }

    public DateOnly Ende_FechaVencimiento { get; set; }

    public DateOnly Ende_FechaFabricacion { get; set; }

    public bool Ende_Estado { get; set; }

    public int Ende_Creacion { get; set; }

    public DateTime Ende_FechaCreacion { get; set; }

    public int? Ende_Modificacion { get; set; }

    public DateTime? Ende_FechaModificacion { get; set; }

}


public partial class tbEstadosCiviles
{
    public int EsCi_Id { get; set; }

    public string EsCi_Descripcion { get; set; }

    public bool EsCi_Estado { get; set; }

    public int EsCi_Creacion { get; set; }

    public DateTime EsCi_FechaCreacion { get; set; }

    public int? EsCi_Modificacion { get; set; }

    public DateTime? EsCi_FechaModificacion { get; set; }
}


public partial class tbLotes
{
    public int Lote_Id { get; set; }

    public int Arti_Id { get; set; }

    public string Lote_Codigo { get; set; }

    public string Lote_Atributo1 { get; set; }

    public string Lote_Atributo2 { get; set; }

    public DateOnly Lote_FechaAdmision { get; set; }

    public DateOnly Lote_FechaFabricacion { get; set; }

    public DateOnly Lote_FechaVencimiento { get; set; }

    public decimal Lote_CostoUnitario { get; set; }

    public int Lote_CantidadDisponible { get; set; }

    public bool Lote_Estado { get; set; }

    public int Lote_Creacion { get; set; }

    public DateTime Lote_FechaCreacion { get; set; }

    public int? Lote_Modificacion { get; set; }

    public DateTime? Lote_FechaModificacion { get; set; }


}


public partial class tbMunicipios
{
    public string Muni_Codigo { get; set; }

    public string Muni_Descripcion { get; set; }

    public string Dept_Codigo { get; set; }

    public bool Muni_Estado { get; set; }

    public int Muni_Creacion { get; set; }

    public DateTime Muni_FechaCreacion { get; set; }

    public int? Muni_Modificacion { get; set; }

    public DateTime? Muni_FechaModificacion { get; set; }

}


public partial class tbSalidas
{
    public int Sali_Id { get; set; }

    public int Sucs_Id { get; set; }

    public DateTime Sali_FechaSalida { get; set; }

    public string Sali_EstadoSalida { get; set; }

    public decimal Sali_CostoTotal { get; set; }

    public int Sali_UsuarioEnvia { get; set; }

    public int? Sali_UsuarioRecibe { get; set; }

    public int? Vehi_Id { get; set; }

    public int? Sali_Transportista { get; set; }

    public DateTime? Sali_FechaRecepcion { get; set; }

    public string Sali_GuiaRemision { get; set; }

    public bool Sali_Estado { get; set; }

    public int Sali_Creacion { get; set; }

    public DateTime Sali_FechaCreacion { get; set; }

    public int? Sali_Modificacion { get; set; }

    public DateTime? Sali_FechaModificacion { get; set; }

    [NotMapped]
    public string Usua_Creacion { get; set; }

    [NotMapped]
    public string Usua_Modificacion { get; set; }


}


public partial class tbSalidasDetalle
{
    public int Sade_Id { get; set; }

    public int Sali_Id { get; set; }

    public int Arti_Id { get; set; }

    public int Lote_Id { get; set; }

    public int Sade_Cantidad { get; set; }

    public decimal Sade_CostoUnitario { get; set; }

    public DateOnly Sade_FechaVencimiento { get; set; }

    public bool Sade_Estado { get; set; }

    public int Sade_Creacion { get; set; }

    public DateTime Sade_FechaCreacion { get; set; }

    public int? Sade_Modificacion { get; set; }

    public DateTime? Sade_FechaModificacion { get; set; }


}



public partial class tbSucursales
{
    public int Sucs_Id { get; set; }

    public string Sucs_Descripcion { get; set; }

    public string Muni_Codigo { get; set; }

    public bool Sucs_Estado { get; set; }

    public int Sucs_Creacion { get; set; }

    public DateTime Sucs_FechaCreacion { get; set; }

    public int? Sucs_Modificacion { get; set; }

    public DateTime? Sucs_FechaModificacion { get; set; }

    
}


public partial class tbVehiculos
{
    public int Vehi_Id { get; set; }

    public string Vehi_Codigo { get; set; }

    public string Vehi_Marca { get; set; }

    public string Vehi_Modelo { get; set; }

    public string Vehi_Placa { get; set; }

    public int Vehi_Anio { get; set; }

    public bool Vehi_Estado { get; set; }

    public int Vehi_Creacion { get; set; }

    public DateTime Vehi_FechaCreacion { get; set; }

    public int? Vehi_Modificacion { get; set; }

    public DateTime? Vehi_FechaModificacion { get; set; }

   
}

