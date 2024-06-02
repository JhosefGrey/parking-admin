import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AgenteVista, AgenteCrear, AgenteEditar } from '../models/agente';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  constructor(private _http: HttpClient) { }


  getAll() {
    return this._http.get<AgenteVista[]>(`${environment.API_URL}agente`)
  }

  getById(id: string) {
    return this._http.get<AgenteVista>(`${environment.API_URL}agente/${id}`)
  }


  create(obj: AgenteCrear) {
    return this._http.post(`${environment.API_URL}agente`, obj)
  }

  update(obj: AgenteEditar) {
    return this._http.put(`${environment.API_URL}agente`, obj)
  }

  delete(id: string) {
    return this._http.delete(`${environment.API_URL}agente/${id}`)

  }

}
