import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entradas } from 'src/app/Models/Inventario/Entradas.Model';
import { Salidas } from 'src/app/Models/Inventario/Salidas.Model';
import { Articulos } from 'src/app/Models/General/Articulos.Model';
import { Sucursales } from 'src/app/Models/General/Sucursales.Model';
import { Lotes } from 'src/app/Models/Inventario/Lotes.Model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json'
    };
  }

  // --- Entradas ---
  getEntradas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Entradas/Listar`, { headers: this.getHeaders() });
  }

  insertEntrada(entrada: Entradas): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Entradas/Insertar`, entrada, { headers: this.getHeaders() });
  }

  // --- Salidas ---
  getSalidas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Salidas/Listar`, { headers: this.getHeaders() });
  }

  insertSalida(salida: Salidas): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Salidas/Insertar`, salida, { headers: this.getHeaders() });
  }

  recibirSalida(saliId: number, usuarioId: number): Observable<any> {
    const payload = { Sali_Id: saliId, Usua_Creacion: usuarioId };
    return this.http.put<any>(`${this.apiUrl}/Salidas/Recibir`, payload, { headers: this.getHeaders() });
  }

  getSalidaDetalle(saliId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Salidas/ObtenerCompleta/${saliId}`, { headers: this.getHeaders() });
  }

  // --- Catálogos y Auxiliares ---
  getArticulosConDetalle(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Articulos/ListarConDetalle`, { headers: this.getHeaders() });
  }

  getSucursales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Sucursales/Listar`, { headers: this.getHeaders() });
  }

  getVehiculos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Vehiculos/Listar`, { headers: this.getHeaders() });
  }
  
  getLotes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Lotes/Listar`, { headers: this.getHeaders() });
  }
}
