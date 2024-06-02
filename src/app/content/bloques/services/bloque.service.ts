import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BloqueVista, BloqueCrear, BloqueEditar } from '../models/bloque';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  constructor(private _http: HttpClient) { }


  getAll() {
    return this._http.get<BloqueVista[]>(`${environment.API_URL}bloque`)
  }

  getById(id: string) {
    return this._http.get<BloqueVista>(`${environment.API_URL}bloque/${id}`)
  }


  create(obj: BloqueCrear) {
    return this._http.post(`${environment.API_URL}bloque`, obj)
  }

  update(obj: BloqueEditar) {
    return this._http.put(`${environment.API_URL}bloque`, obj)
  }

  delete(id: string) {
    return this._http.delete(`${environment.API_URL}bloque/${id}`)

  }
}
