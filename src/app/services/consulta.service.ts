import { Injectable } from '@angular/core';
import { Funcionario } from '../models/Funcionario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/api/consulta-servico';


  constructor(private http: HttpClient) { }

  consultar(consulta: string): Observable<any> {
    return this.http.post<ItensServicoResponse>(this.apiUrl, {expressao: consulta});
  }
}

export interface ItensServicoResponse {
  id: number;
  horarioInicio: number;
  horarioFim: number;
  quantidade: number;
  precoTotal: number;
  funcionarioId: number;
  funcionarioNome: string;
  funcionarioCargo: string;
  servicoId: number;
  servicoNome: string;
  servicoPrecoUnitario: number;
  numeroOs: number;
  statusOs: string;
  placaVeiculo: string;
  clienteNome: string;
}
