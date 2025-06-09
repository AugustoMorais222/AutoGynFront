import { Injectable } from '@angular/core';
import { Peca } from '../models/peca.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PecaService {
  private apiUrl = 'http://localhost:8080/api/pecas';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Peca[]> {
    return this.http.get<Peca[]>(this.apiUrl);
  }

  salvar(peca: Peca): Observable<any> {
    return this.http.post(this.apiUrl, peca);
  }

  atualizar(id: number, peca: Peca): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, peca);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}