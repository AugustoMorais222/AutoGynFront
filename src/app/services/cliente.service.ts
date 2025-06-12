import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8081/api/clientes';


  constructor(private http: HttpClient) { }

    listarTodos(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.apiUrl);
    }
  
    salvar(cliente: Cliente): Observable<any> {
      return this.http.post(this.apiUrl, cliente);
    }
  
    atualizar(id: number, cliente: Cliente): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, cliente);
    }
  
    deletar(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
