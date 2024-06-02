import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudAgenteVista } from '../models/solicitud-agente';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAgenteService {

  constructor(private _http: HttpClient) { }

  getAllByAgente(id: string){
    return this._http.get<SolicitudAgenteVista[]>(`${environment.API_URL}solicitud/agente/${id}`)
  }

}
