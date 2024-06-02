import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ParqueoVista, ParqueoCrear, ParqueoEditar } from '../models/parqueo';

@Injectable({
  providedIn: 'root'
})
export class ParqueoService {

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get<ParqueoVista[]>(`${environment.API_URL}parqueo`)
  }

  getById(id: string) {
    return this._http.get<ParqueoVista>(`${environment.API_URL}parqueo/${id}`)
  }

  create(obj: ParqueoCrear) {
    return this._http.post(`${environment.API_URL}parqueo`, obj)
  }

  update(obj: ParqueoEditar) {
    return this._http.put(`${environment.API_URL}parqueo`, obj)
  }

  delete(id: string) {
    return this._http.delete(`${environment.API_URL}parqueo/${id}`)

  }

}
