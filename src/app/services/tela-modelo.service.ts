import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from '../models/Modelo';
import { Marca } from '../models/Marca';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private apiUrl = 'http://localhost:8080/api/modelos';

  constructor(private http: HttpClient) { }

  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.apiUrl);
  }

  getModeloById(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.apiUrl}/${id}`);
  }

  addModelo(modelo: Modelo): Observable<void> {
    return this.http.post<void>(this.apiUrl, modelo);
  }

  updateModelo(modelo: Modelo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${modelo.id}`, modelo);
  }

  deleteModelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findByMarca(id: number): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(this.apiUrl+"/marcas/"+id)
  }
}