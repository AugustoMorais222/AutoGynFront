import { Injectable } from '@angular/core';
import { Acessorio } from '../models/Acessorios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoriosService {
  private apiUrl = 'http://localhost:8080/api/acessorios';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Acessorio[]> {
    return this.http.get<Acessorio[]>(this.apiUrl);
  }

  salvar(acessorios: Acessorio): Observable<any> {
    return this.http.post(this.apiUrl, acessorios);
  }

  atualizar(id: number, acessorios: Acessorio): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, acessorios);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
