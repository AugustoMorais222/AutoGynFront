import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdemServicoRequest } from '../models/OrdemServicoRequest';
import { OrdemServico } from '../models/OrdemServico';



@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  private apiUrl = 'http://localhost:8080/api/ordemServico';

  constructor(private http: HttpClient) { }

  /** GET /api/ordemServico */
  listarTodos(): Observable<OrdemServico[]> {
    return this.http.get<OrdemServico[]>(this.apiUrl);
  }

  /** GET /api/ordemServico/{numero} */
  pegarPorNumero(numero: number): Observable<OrdemServico> {
    return this.http.get<OrdemServico>(`${this.apiUrl}/${numero}`);
  }

  /** POST /api/ordemServico */
  criar(dto: OrdemServicoRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  /** PUT /api/ordemServico/{numero} */
  atualizar(numero: number, dto: OrdemServicoRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${numero}`, dto);
  }

  /** GET /api/ordemServico/{numero}/pdf → retorna Blob para download */
  pegarPdf(numero: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/${numero}/pdf`,
      { responseType: 'blob' }  // ← no generic, TS will pick the overload that returns Observable<Blob>
    );
  }
  deletar(numero: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numero}`);
  }
}
