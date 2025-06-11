import { Injectable } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/api/funcionarios';


  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  salvar(funcionario: Funcionario): Observable<any> {
    return this.http.post(this.apiUrl, funcionario);
  }

  atualizar(id: number, funcionario: Funcionario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, funcionario);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
