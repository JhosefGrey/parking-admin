import { Component, OnInit } from '@angular/core';
import { AgenteVista } from '../agentes/models/agente';
import { AgenteService } from '../agentes/services/agente.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  constructor(private _agente: AgenteService, private _location: Location) { }

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

  loadData() {

  }

}
