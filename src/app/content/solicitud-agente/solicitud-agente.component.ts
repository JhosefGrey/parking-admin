import { Component, OnInit } from '@angular/core';
import { AgenteVista } from '../agentes/models/agente';
import { AgenteService } from '../agentes/services/agente.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudAgenteService } from './services/solicitud-agente.service';
import { SolicitudAgenteVista } from './models/solicitud-agente';

@Component({
  selector: 'app-solicitud-agente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-agente.component.html',
  styleUrl: './solicitud-agente.component.scss'
})
export class SolicitudAgenteComponent implements OnInit {

  agentes: AgenteVista[] = [];
  idAgente: string = '';

  solicitudes: SolicitudAgenteVista[] = [];

  constructor(private _agente: AgenteService, private _location: Location, private _service: SolicitudAgenteService) { }

  ngOnInit(): void {
    this.getAllAgentes();
  }

  getAllAgentes() {
    this._agente.getAll().subscribe((res) => {
      this.agentes = res;
    })
  }

  back() {
    this._location.back();
  }

  loadData(event: string) {
    this._service.getAllByAgente(event).subscribe((res) => {
      this.solicitudes = res;
    })
  }

}
