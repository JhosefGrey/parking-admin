import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CasaVista, CasaCrear, CasaEditar } from '../models/casa';

@Injectable({
  providedIn: 'root'
})
export class CasaService {

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get<CasaVista[]>(`${environment.API_URL}casa`)
  }

  getById(id: string) {
    return this._http.get<CasaVista>(`${environment.API_URL}casa/${id}`)
  }

  create(obj: CasaCrear) {
    return this._http.post(`${environment.API_URL}casa`, obj)
  }

  update(obj: CasaEditar) {
    return this._http.put(`${environment.API_URL}casa`, obj)
  }

  delete(id: string) {
    return this._http.delete(`${environment.API_URL}casa/${id}`)
  }
  
}
