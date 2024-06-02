import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AdministradorVista, AdministradorCrear, AdministradorEditar } from '../models/administradot';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  constructor(private _http: HttpClient) { }


  getAll() {
    return this._http.get<AdministradorVista[]>(`${environment.API_URL}administrador`)
  }

  getById(id: string) {
    return this._http.get<AdministradorVista>(`${environment.API_URL}administrador/${id}`)
  }


  create(obj: AdministradorCrear) {
    return this._http.post(`${environment.API_URL}administrador`, obj)
  }

  update(obj: AdministradorEditar) {
    return this._http.put(`${environment.API_URL}administrador`, obj)
  }

  delete(id: string) {
    return this._http.delete(`${environment.API_URL}administrador/${id}`)

  }

}
