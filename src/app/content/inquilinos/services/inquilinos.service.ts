import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { InquilinoVista, InquilinoCrear, InquilinoEditar } from '../models/inquilino';

@Injectable({
  providedIn: 'root'
})
export class InquilinosService {

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get<InquilinoVista[]>(`${environment.API_URL}inquilino`)
  }

  getById(id: string) {
    return this._http.get<InquilinoVista>(`${environment.API_URL}inquilino/${id}`)
  }

  create(obj: InquilinoCrear) {
    return this._http.post(`${environment.API_URL}inquilino`, obj)
  }

  update(obj: InquilinoEditar) {
    return this._http.put(`${environment.API_URL}inquilino`, obj)
  }

  delete(id: string) {
    return this._http.delete(`${environment.API_URL}inquilino/${id}`)
  }
}
