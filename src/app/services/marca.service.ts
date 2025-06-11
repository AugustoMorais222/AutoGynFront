import { Injectable } from '@angular/core';
import { Marca } from '../models/Marca';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:8081/api/marcas';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  salvar(marca: Marca): Observable<any> {
    return this.http.post(this.apiUrl, marca);
  }

  atualizar(id: number, marca: Marca): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, marca);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
