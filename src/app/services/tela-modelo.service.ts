import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TelaModelo } from '../models/tela-modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private apiUrl = 'http://localhost:8080/modelos'; // URL base da API para modelos

  constructor(private http: HttpClient) { }

  // Listar todos os modelos
  getModelos(): Observable<TelaModelo[]> {
    return this.http.get<TelaModelo[]>(this.apiUrl);
  }

  // Buscar modelo por ID
  getModeloById(id: number): Observable<TelaModelo> {
    return this.http.get<TelaModelo>(`${this.apiUrl}/${id}`);
  }

  // Salvar novo modelo
  addModelo(modelo: { nome: string; marca: { id: number | undefined } }): Observable<void> {
    return this.http.post<void>(this.apiUrl, modelo);
  }

  // Atualizar modelo existente
  updateModelo(id: number, modelo: { nome: string; marca: { id: number | undefined } }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, modelo);
  }

  // Deletar modelo por ID
  deleteModelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}