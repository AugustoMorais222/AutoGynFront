// src/app/services/servico.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicos } from '../models/servicos.model';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  private apiUrl = 'http://localhost:8080/api/servicos'; // URL do backend

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Servicos[]> {
    return this.http.get<Servicos[]>(this.apiUrl);
  }

  salvar(servico: Servicos): Observable<any> {
    return this.http.post(this.apiUrl, servico);
  }

  atualizar(id: number, servico: Servicos): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, servico);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}