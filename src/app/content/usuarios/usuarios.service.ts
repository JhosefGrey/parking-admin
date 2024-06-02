import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioCrear, UsuarioVista } from './models/usuarios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http: HttpClient) { }


  getAll() {
    return this._http.get<UsuarioVista[]>(`${environment.API_URL}usuario`)
  }

  create(obj: UsuarioCrear) {
    return this._http.post(`${environment.API_URL}auth/register`, obj)
  }


  delete(id: string) {
    return this._http.delete(`${environment.API_URL}usuario/${id}`)

  }

}
