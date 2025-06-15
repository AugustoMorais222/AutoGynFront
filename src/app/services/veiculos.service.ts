import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/Veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = 'http://localhost:8080/api/veiculos';

  constructor(private httpClient: HttpClient) {}

  // Método para obter todos os veículos
  getVeiculos(): Observable<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(this.apiUrl);
  }

  // Método para obter um veículo pelo ID
  getVeiculoById(id: string): Observable<Veiculo> {
    return this.httpClient.get<Veiculo>(`${this.apiUrl}/${id}`);
  }

  // Método para adicionar um novo veículo
  addVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.post<Veiculo>(this.apiUrl, veiculo);
  }

  // Método para atualizar um veículo existente
  updateVeiculo(id: string, veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
  }

  // Método para deletar um veículo pelo ID
  deleteVeiculo(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}