import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/Veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = 'http://localhost:8081/api/veiculos';

  constructor(private httpClient: HttpClient) {}

  getVeiculos(): Observable<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(this.apiUrl);
  }

  getVeiculoById(id: string): Observable<Veiculo> {
    return this.httpClient.get<Veiculo>(`${this.apiUrl}/${id}`);
  }

  addVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.post<Veiculo>(this.apiUrl, veiculo);
  }

  updateVeiculo(id: string, veiculo: Veiculo): Observable<Veiculo> {
    return this.httpClient.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
  }

  deleteVeiculo(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}